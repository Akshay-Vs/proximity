"use server";

import { loginSchema } from "@/schemas/login-schema";
import { z } from "zod";
import { cookies } from "next/headers";
import axios from "axios";
import { LoginResponse, KratosResponse } from "@/types/kratos-types";


export const loginAction = async (
  values: z.infer<typeof loginSchema>
): Promise<LoginResponse> => {
  const kratosUrl = process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL;

  if (!kratosUrl) {
    return { error: "Service unavailable" };
  }

  try {
    // Get login flow
    const flowResponse = await axios.get(`${kratosUrl}/self-service/login/api`);
    const flow = flowResponse.data;

    if (!flow?.ui?.action) {
      return { error: "Unable to process login" };
    }

    // Get CSRF token
    const csrfToken = flow.ui.nodes.find(
      (node: { attributes: { name: string; }; }) => node.attributes.name === "csrf_token"
    )?.attributes.value;

    // Submit login
    const loginResponse = await axios.post<KratosResponse>(
      flow.ui.action,
      {
        csrf_token: csrfToken,
        method: "password",
        password: values.password,
        password_identifier: values.email.toLowerCase().trim(),
      }
    );

    if (loginResponse.data.session_token) {
      const cookieStore = await cookies();

      cookieStore.set("session_token", loginResponse.data.session_token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return { success: true };
    }

    return { error: "Invalid credentials" };

  } catch {
    return { error: "Authentication failed" };
  }
};
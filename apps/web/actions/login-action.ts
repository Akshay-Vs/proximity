"use server";

import { loginSchema } from "@/schemas/login-schema";
import { z } from "zod";
import { cookies } from "next/headers";
import axios from "axios";
import { LoginResponse, KratosResponse } from "@/types/kratos-types";


export const loginAction = async (
  values: z.infer<typeof loginSchema>
): Promise<LoginResponse> => {
  console.log("Login request received")
  const kratosUrl = process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL;

  if (!kratosUrl) {
    return { type: 'error', message: "Service unavailable" };
  }

  try {
    // Get login flow
    const flowResponse = await axios.get(`${kratosUrl}/self-service/login/api`);
    const flow = flowResponse.data;

    if (!flow?.ui?.action) {
      return { type: 'error', message: "Unable to process login" };
    }

    // Get CSRF token
    const csrfToken = flow.ui.nodes.find(
      (node: { attributes: { name: string; }; }) => node.attributes.name === "csrf_token"
    )?.attributes.value;

    const sanitizedEmail = values.email.toLowerCase().trim();
    if (!sanitizedEmail || !values.password) {
      return { type: 'error', message: "Email and password are required" };
    }

    console.log("submitting request", flow.ui.action)
    // Submit login
    const loginResponse = await axios.post<KratosResponse>(
      flow.ui.action,
      {
        csrf_token: csrfToken,
        method: "password",
        password: values.password,
        password_identifier: sanitizedEmail,
        remember_me: true
      }
    );
    console.log(loginResponse)

    if (loginResponse.data.session_token) {
      const cookieStore = await cookies();

      cookieStore.set("session_token", loginResponse.data.session_token, {
        httpOnly: true,
        secure: true,
        path: "/",
        priority: "high"
      });

      console.log("Login success")
      return { type: 'success', message: 'login successfull' };
    }

    return { type: 'error', message: "Authentication failed" };

  } catch (err) {
    console.log(err)
    if (axios.isAxiosError(err)) {
      return { type: 'error', message: "Invalid credentials" };
    }
    return { type: 'error', message: "Authentication failed" };
  }
};
"use server";

import { loginSchema } from "@/schemas/login-schema";
import { z } from "zod";
import { cookies } from "next/headers";
import axios from "axios";
import { LoginResponse, KratosResponse } from "@/types/kratos-types";

export const loginAction = async (
  values: z.infer<typeof loginSchema>,
  flowId: string // ✅ Accept flow ID from client
): Promise<LoginResponse> => {
  console.log("Login request received with flow ID:", flowId);

  const kratosUrl = process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL;
  if (!kratosUrl) {
    return { type: "error", message: "Service unavailable" };
  }

  try {
    // Fetch the login flow using the correct flow ID
    const { data: flow } = await axios.get(`${kratosUrl}/self-service/login/flows?id=${flowId}`);

    console.log("Flow:", JSON.stringify(flow));
    if (!flow?.ui?.action) {
      return { type: "error", message: "Invalid or expired login session. Refresh and try again." };
    }

    // Extract CSRF token safely
    const csrfToken = flow.ui.nodes.find(
      (node: { attributes?: { name?: string; value?: string } }) =>
        node.attributes?.name === "csrf_token"
    )?.attributes?.value;

    if (!csrfToken) {
      return { type: "error", message: "CSRF token not found" };
    }

    const sanitizedEmail = values.email.toLowerCase().trim();
    if (!sanitizedEmail || !values.password) {
      return { type: "error", message: "Email and password are required" };
    }

    console.log("Submitting login request to:", flow.ui.action);

    // Submit login request
    const { data: loginResponse } = await axios.post<KratosResponse>(flow.ui.action, {
      csrf_token: csrfToken,
      method: "password",
      password: values.password,
      password_identifier: sanitizedEmail,
      remember_me: true,
    });

    console.log("Login Response:", loginResponse);

    if (loginResponse.session_token) {
      // Set session token securely
      (await
        // Set session token securely
        cookies()).set("session_token", loginResponse.session_token, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "strict",
          priority: "high",
        });

      console.log("Login successful");
      return { type: "success", message: "Login successful" };
    }

    return { type: "error", message: "Authentication failed" };
  } catch (err) {
    console.error("Login error:", err);
    if (axios.isAxiosError(err)) {
      return { type: "error", message: err.response?.data?.error?.message || "Invalid credentials" };
    }
    return { type: "error", message: "Authentication failed" };
  }
};

"use server";
import { loginSchema } from "@/schemas/login-schema";
import axios from "axios";
import { z } from "zod";
import { cookies } from "next/headers";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  const endpoint = "https://naughty-gates-3mw25r4yly.projects.oryapis.com/self-service/login/api";
  const response = await axios.get(endpoint);
  const flow = response.data;

  if (!flow?.ui?.action) {
    console.log("Incorrect flow:", flow);
    return { error: "Invalid login flow" };
  }

  console.log("Logging in...");
  try {
    const tokenResponse = await axios.post(flow.ui.action, {
      csfr_token: "",
      method: "password",
      password: values.password,
      password_identifier: values.email,
    });

    console.log("Request success", tokenResponse.data);

    if (!tokenResponse.data.session_token) {
      return { error: "Authentication failed" };
    }

    // Set session token in response cookie
    (await
      // Set session token in response cookie
      cookies()).set("session_token", tokenResponse.data.session_token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax", // Fix potential issues with navigation requests
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login error:", error.response?.data || error.message);
    } else {
      console.error("Login error:", error);
    }
    return { error: "Invalid credentials" };
  }
};

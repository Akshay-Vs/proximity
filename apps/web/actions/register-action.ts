"use server"

import { registerSchema } from "@/schemas/register-schema"
import { KratosResponse, RegisterResponse } from "@/types/kratos-types";
import axios from "axios";
import { cookies } from "next/headers";
import { z } from "zod"

export const registerAction = async (values: z.infer<typeof registerSchema>): Promise<RegisterResponse> => {
  const kratosUrl = process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL;

  if (!kratosUrl) {
    return { type: 'error', message: "Service unavailable" };
  }

  const validatedValues = registerSchema.safeParse(values)
  if (validatedValues.error) {
    return { type: 'error', message: "Invalid fields" };
  }

  const { email, password } = validatedValues.data

  try {
    // Get login flow
    const flowResponse = await axios.get(`${kratosUrl}/self-service/registration/api`);
    const flow = flowResponse.data;

    if (!flow?.ui?.action) {
      return { type: 'error', message: "Unable to process register" };
    }

    // Get CSRF token
    const csrfToken = flow.ui.nodes.find(
      (node: { attributes: { name: string; }; }) => node.attributes.name === "csrf_token"
    )?.attributes.value;


    const sanitizedEmail = email.toLowerCase().trim();


    console.log(flow.ui.action)
    // Submit register
    const registerResponse = await axios.post<KratosResponse>(
      flow.ui.action,
      {
        csrf_token: csrfToken,
        method: "password",
        password: password,
        traits: {
          email: sanitizedEmail
        }
      }
    );

    if (registerResponse.data.session_token) {
      const cookieStore = await cookies();

      cookieStore.set("session_token", registerResponse.data.session_token, {
        httpOnly: true,
        secure: true,
        path: "/",
        priority: "high"
      });

      console.log("Registration success")
      return { type: 'success', message: 'Registration successfull' };
    }

    return { type: 'error', message: "Registration failed" };

  }
  catch (err) {
    console.log(err)
    if (axios.isAxiosError(err)) {
      return { type: 'error', message: "Invalid credentials" };
    }
    return { type: 'error', message: "Registration failed" };
  }
}
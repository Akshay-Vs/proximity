import { ory } from "@/data/auth/ory";
import { registerSchema } from "@/schemas/register-schema";
import { RegisterResponse } from "@/types/kratos-types";
import { getCsrfToken } from "@/utils/get-csrf-token";
import { getOryMessageId } from "@/utils/get-ory-message-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFlow } from "@ory/client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useRegisterForm = () => {
  const router = useRouter();

  const [status, setStatus] = useState<RegisterResponse>();
  const [loading, startLoading] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
  });

  const initiateRegister = (values: z.infer<typeof registerSchema>) => {
    startLoading(async () => {
      try {
        const oryApi = await ory.createBrowserRegistrationFlow({
          returnTo: '',
        })

        const flow = oryApi.data.id;
        const csrf_token = getCsrfToken(oryApi.data);


        if (!flow) {
          return setStatus({
            type: 'error',
            message: 'Invalid flow',
          });
        }

        if (!csrf_token) {
          return setStatus({
            type: 'error',
            message: 'csrf verification failed, refresh and try again'
          })
        }

        const register = await ory.updateRegistrationFlow({
          flow,
          updateRegistrationFlowBody: {
            csrf_token,
            method: 'password',
            password: values.password,
            traits: {
              email: values.email,
              // username: values.fullname //TODO
            }
          }
        })

        if (register.data.identity.id) {
          setStatus({
            type: 'success',
            message: 'Registration successful',
          });

          return router.push('/');
        }

        setStatus({
          type: 'error',
          message: 'Registration failed',
        });
      }
      catch (error) {
        if (error instanceof AxiosError) {
          const res = error.response?.data as LoginFlow
          const code = getOryMessageId(res)

          switch (code) {
            case 4000028:
              return setStatus({
                type: 'error',
                message: 'Email already taken',
              });

            case 4000034:
              return setStatus({
                type: 'error',
                message: 'Password is not secure'
              })

            default:
              return setStatus({
                type: 'error',
                message: 'Something went wrong',
              });
          }
        }
        setStatus({
          type: 'error',
          message: 'Something went wrong',
        });
      }
    })
  }

  return { form, router, status, setStatus, loading, startLoading, initiateRegister }
}
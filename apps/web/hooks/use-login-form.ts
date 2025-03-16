import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ory } from "@/data/auth/ory";
import { loginSchema } from "@/schemas/login-schema";
import { LoginResponse } from "@/types/kratos-types";
import { getCsrfToken } from "@/utils/get-csrf-token";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFlow } from "@ory/client";
import { getOryMessageId } from "@/utils/get-ory-message-id";

const UseLoginForm = () => {
  const router = useRouter();
  const [status, setStatus] = useState<LoginResponse>();
  const [loading, startLoading] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const initiateLogin: (values: z.infer<typeof loginSchema>) => void = (values) => {
    startLoading(async () => {
      try {
        const oryApi = await ory.createBrowserLoginFlow({
          returnTo: '',
          refresh: true
        });

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

        const login = await ory.updateLoginFlow({
          flow,
          updateLoginFlowBody: {
            csrf_token,
            method: 'password',
            password: values.password,
            identifier: values.email,
          },
        });

        if (login.data.session.id) {
          setStatus({
            type: 'success',
            message: 'Login successful',
          });

          return router.push('/');
        }

        setStatus({
          type: 'error',
          message: 'login failed',
        });
      }

      catch (error) {
        if (error instanceof AxiosError) {
          const res = error.response?.data as LoginFlow
          const code = getOryMessageId(res)

          switch (code) {
            case 4000006:
              return setStatus({
                type: 'error',
                message: 'Invalid Credentials'
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
    });
  };

  return { form, router, status, setStatus, loading, startLoading, initiateLogin }
}
export default UseLoginForm

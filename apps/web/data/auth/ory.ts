import { FrontendApi, Configuration } from "@ory/client";
import { oryEndpoint } from "../get-session";

export const ory = new FrontendApi(
  new Configuration({
    basePath: oryEndpoint,
    baseOptions: {
      withCredentials: true,
    },
  })
);
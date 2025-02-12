type LoginResponse = {
  success?: boolean;
  error?: string;
};

type KratosResponse = {
  session_token: string;
  session: {
    id: string;
    identity: {
      traits: {
        email: string;
      };
    };
  };
};

export type { KratosResponse, LoginResponse }
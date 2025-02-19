type LoginResponse = {
  type: 'error' | 'success' | 'info';
  message: string;
};

type RegisterResponse = LoginResponse

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

export type { KratosResponse, LoginResponse, RegisterResponse }
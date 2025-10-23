import { useState } from "react";
import { authService } from "../services/auth/auth.service";
import type { LoginProps, LoginResponseProps } from "../services/auth/auth.type";

export const useLogin = () => {
  const [data, setData] = useState<LoginResponseProps>({} as LoginResponseProps);

  const fetchLogin = async (body: LoginProps) => {
    const response = await authService().login(body);

    setData(response);
  };

  return {
    fetchLogin,
    data,
  };
};

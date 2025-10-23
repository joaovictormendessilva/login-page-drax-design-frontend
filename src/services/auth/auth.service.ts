import type { AxiosResponse } from "axios";
import { api } from "../../axios/config";
import { endpoints } from "../endpoints";
import type { LoginProps, LoginResponseProps } from "./auth.type";

export const authService = () => {
  const login = async (body: LoginProps): Promise<LoginResponseProps> => {
    const response = await api.post<
      LoginResponseProps,
      AxiosResponse<LoginResponseProps>,
      LoginProps
    >(endpoints.auth.login, body);

    return response.data;
  };

  return { login };
};

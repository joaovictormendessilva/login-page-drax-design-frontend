import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth/auth.service";
import type { LoginProps, LoginResponseProps } from "../services/auth/auth.type";

export const useLogin = () => {
  return useMutation<LoginResponseProps, Error, LoginProps>({
    mutationFn: async (body: LoginProps) => {
      const response = await authService().login(body);

      return response;
    },
  });
};

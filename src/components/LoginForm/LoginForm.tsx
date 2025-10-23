import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../Button";
import { Input } from "../Input";
import { SocialChip } from "../SocialChip";
import { schema } from "./validation/schema";
import type { FormData } from "./validation/Schema.type";
import { useLogin } from "../../hooks/useLogin";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const { fetchLogin } = useLogin();

  const onSubmit = async (formData: FormData) => {
    try {
      await fetchLogin(formData);

      reset();
      toast.success("Login Successful.");
    } catch {
      // handled by axios
    }
  };

  return (
    <form
      className="min-h-[600px] rounded-3xl bg-white/30 px-[32px] pt-[48px] pb-[24px] sm:w-[455px] sm:px-[64px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-lg text-[#F25019]">Your logo</p>
      <p className="text-5xl font-bold text-[#333333]">Login</p>

      <div className="flex flex-col gap-4 pt-6">
        <Input
          id="email"
          label="Email"
          placeholder="username@gmail.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <p className="text-right text-sm text-[#AE4700]">Forgot Password?</p>
      </div>

      <div className="pt-8">
        <Button text="Sign in" onClick={() => {}} type="submit" />
      </div>

      <div className="pt-6">
        <p className="text-center text-sm text-[#333333]">Or Continue With</p>
      </div>

      <div className="flex flex-row justify-center gap-4 pt-6">
        <SocialChip src="/gmail_icon.svg" />
        <SocialChip src="/github_icon.svg" />
        <SocialChip src="/facebook_icon.svg" />
      </div>

      <div className="pt-16">
        <p className="text-sm text-[#333333]">
          Don't have an account yet?{" "}
          <b className="text-[#AE4700]">
            <a href="/">Register for free</a>
          </b>
        </p>
      </div>
    </form>
  );
}

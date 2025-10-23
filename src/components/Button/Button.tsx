import type { ButtonProps } from "./Button.type";

export function Button({ text, onClick, isLoading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full cursor-pointer rounded-[3.56px] bg-[#F25019] py-[7px] font-bold text-white hover:bg-[#bb390e] active:bg-[#bb390e] disabled:cursor-not-allowed disabled:bg-[#f18e6c]"
      onClick={onClick}
      disabled={isLoading}
    >
      {text}
    </button>
  );
}

import type { InputProps } from "./Input.type";

export function Input({ label, id, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[#333333]">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="rounded-sm bg-white px-4 py-3 outline-none focus:ring-[0.5px]"
      />
      {error && (
        <p role="alert" className="mt-[-5px] text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

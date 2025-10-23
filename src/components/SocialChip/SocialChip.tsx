import type { SocialChipProps } from "./SocialChip.type";

export function SocialChip({ src }: SocialChipProps) {
  return (
    <a href="/">
      <div className="bg-white w-[72.67px] h-[35px] flex justify-center items-center rounded-[28.46px] cursor-pointer">
        <img src={src} />
      </div>
    </a>
  );
}

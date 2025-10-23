export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  onClick: () => void;
  isLoading?: boolean;
};

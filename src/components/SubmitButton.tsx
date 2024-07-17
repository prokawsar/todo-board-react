import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
  isSubmit?: boolean;
};

export function SubmitButton({
  children,
  pendingText,
  isSubmit,
  ...props
}: Props) {
  return <button {...props}>{isSubmit ? pendingText : children}</button>;
}

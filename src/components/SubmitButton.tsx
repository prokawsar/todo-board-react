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
  // const { pending, action } = useFormStatus()
  // const isPending = pending && action === props.formAction
  // return (
  //   <button {...props} type="submit" aria-disabled={pending}>
  //     {isPending ? pendingText : children}
  //   </button>
  // )
  return <button {...props}>{isSubmit ? pendingText : children}</button>;
}

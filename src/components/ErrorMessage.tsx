import { ReactNode } from "react";

export function ErrorMessage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-red-500 text-xs ${className}`}>{children}</p>;
}

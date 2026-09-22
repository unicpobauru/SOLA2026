import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "xl" | "lg";
}

export function Container({ children, className = "", size = "xl" }: ContainerProps) {
  const base = size === "xl" ? "container-xl" : "container-lg";
  return <div className={`${base} ${className}`}>{children}</div>;
}

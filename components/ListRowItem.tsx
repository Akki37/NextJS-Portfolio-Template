import type { ReactNode } from "react";

type ListRowItemProps = {
  children: ReactNode;
  className?: string;
};

export default function ListRowItem({ children, className = "" }: ListRowItemProps) {
  return (
    <li className={`group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 dark:hover:bg-white/[0.01] light:hover:bg-black/[0.02] px-2 -mx-2 rounded-lg transition-all duration-200 ${className}`}>
      {children}
    </li>
  );
}

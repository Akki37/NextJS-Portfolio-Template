import { ReactNode } from "react";

export type StepItemProps = {
  index: number;
  title: string;
  description?: string;
  isLast?: boolean;
  /** Allows passing custom UI widgets or badges into the step content area */
  children?: ReactNode; 
};

export default function StepItem({
  index,
  title,
  description,
  isLast = false,
  children,
}: StepItemProps) {
  return (
    <div className={`relative flex gap-6 ${isLast ? '' : 'pb-10'} group`}>
      {/* Left Timeline Line Track & Node */}
      <div className="flex flex-col items-center shrink-0">
        {/* Ring Node Indicator */}
        <div className="flex h-6 w-6 items-center justify-center rounded-full border dark:border-white/10 dark:bg-neutral-950 dark:group-hover:border-neutral-500 light:border-black/15 light:bg-neutral-100 light:group-hover:border-neutral-400 transition-colors duration-300">
          <div className="h-1.5 w-1.5 rounded-full dark:bg-neutral-600 dark:group-hover:bg-white light:bg-neutral-400 light:group-hover:bg-black transition-colors duration-300" />
        </div>

        {/* Connecting Vertical Line Segment */}
        {!isLast && (
          <div className="w-[1px] grow bg-gradient-to-b dark:from-white/10 dark:to-white/5 dark:group-hover:from-neutral-500/30 light:from-black/10 light:to-black/5 light:group-hover:from-neutral-400/30 transition-colors duration-300" />
        )}
      </div>

      {/* Right Content Block */}
      <div className="-mt-0.5 space-y-1.5 pb-2 grow">
        <span className="block font-mono text-xs font-semibold tracking-wider dark:text-neutral-600 dark:group-hover:text-neutral-400 light:text-neutral-500 light:group-hover:text-neutral-700 transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-base font-medium dark:text-neutral-200 dark:group-hover:text-white light:text-neutral-800 light:group-hover:text-black transition-colors duration-300">
          {title}
        </h3>
        {description && (
          <p className="text-sm leading-relaxed dark:text-neutral-500 dark:group-hover:text-neutral-400 light:text-neutral-600 light:group-hover:text-neutral-800 transition-colors duration-300">
            {description}
          </p>
        )}
        {/* Slot for dynamic additions (e.g., buttons, code blocks, or tags) */}
        {children}
      </div>
    </div>
  );
}

type ClassValue = string | false | null | undefined;

/** Lightweight className joiner used by SmoothUI components. */
export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

import { en } from "./locales/en";
import type { Strings } from "./types";

export type { Strings } from "./types";

export function getStrings(): Strings {
  return en;
}

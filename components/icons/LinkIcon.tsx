import type { SVGProps } from "react";
import type { ProjectLinkIcon } from "@/lib/project/types";
import AppleIcon from "./AppleIcon";
import AndroidIcon from "./AndroidIcon";

type LinkIconProps = SVGProps<SVGSVGElement> & {
  icon: ProjectLinkIcon;
};

export default function LinkIcon({ icon, ...props }: LinkIconProps) {
  if (icon === "apple") return <AppleIcon {...props} />;
  return <AndroidIcon {...props} />;
}

export { AppleIcon, AndroidIcon };

import type React from "react";
import { useRef, useState, useSyncExternalStore } from "react";

export interface ScrambleHoverProps {
  children: string;
  className?: string;
  duration?: number; // total animation duration in ms
  speed?: number; // interval between scrambles in ms
}

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?".split(
    ""
  );

function scrambleText(original: string) {
  return original
    .split("")
    .map((char) =>
      char === " "
        ? " "
        : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
    )
    .join("");
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const ScrambleHover: React.FC<ScrambleHoverProps> = ({
  children,
  duration = 600,
  speed = 30,
  className = "",
}) => {
  const [display, setDisplay] = useState(children);
  const shouldReduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isHoverDevice = useMediaQuery("(hover: hover) and (pointer: fine)");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (shouldReduceMotion || !isHoverDevice) {
      return;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    intervalRef.current = setInterval(() => {
      setDisplay(() => scrambleText(children));
    }, speed);
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setDisplay(children);
    }, duration);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplay(children);
  };

  return (
    <button
      className={className}
      onBlur={handleMouseLeave}
      onFocus={isHoverDevice ? handleMouseEnter : undefined}
      onMouseEnter={isHoverDevice ? handleMouseEnter : undefined}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: "pointer",
        display: "inline-block",
        background: "none",
        border: "none",
        padding: 0,
        font: "inherit",
        color: "inherit",
        textAlign: "inherit",
      }}
      type="button"
    >
      {display}
    </button>
  );
};

export default ScrambleHover;

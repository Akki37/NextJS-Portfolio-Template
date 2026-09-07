"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ToastItem = {
  id: string;
  message: string;
  dismissLabel: string;
};

type ToastContextValue = {
  showToast: (message: string, dismissLabel: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 4500;

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

type ToastProviderProps = {
  children: ReactNode;
};

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastId = useId();
  const reduceMotion = useReducedMotion();

  const clearDismissTimer = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    clearDismissTimer();
    setToast(null);
  }, [clearDismissTimer]);

  const showToast = useCallback(
    (message: string, dismissLabel: string) => {
      clearDismissTimer();
      const id = `${toastId}-${Date.now()}`;
      setToast({ id, message, dismissLabel });
      dismissTimer.current = setTimeout(() => {
        setToast(null);
        dismissTimer.current = null;
      }, AUTO_DISMISS_MS);
    },
    [clearDismissTimer, toastId],
  );

  useEffect(() => () => clearDismissTimer(), [clearDismissTimer]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 md:inset-x-auto md:right-6 md:justify-end"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          {toast ? (
            <motion.div
              key={toast.id}
              role="status"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border dark:border-white/10 dark:bg-gradient-to-br dark:from-zinc-800/90 dark:via-zinc-900/95 dark:to-black/95 dark:shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] light:border-black/10 light:bg-gradient-to-br light:from-zinc-100/95 light:via-zinc-200/95 light:to-white/95 light:shadow-[0_24px_80px_-32px_rgba(0,0,0,0.15)] backdrop-blur-md"
            >
              <div className="flex items-start gap-3 p-4">
                <p className="flex-1 text-sm leading-relaxed dark:text-neutral-200 light:text-neutral-800">
                  {toast.message}
                </p>
                <button
                  type="button"
                  onClick={dismiss}
                  className="shrink-0 rounded-full border dark:border-white/15 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-white/25 dark:hover:bg-white/10 dark:hover:text-white light:border-black/15 light:bg-black/5 light:text-neutral-700 light:hover:border-black/25 light:hover:bg-black/10 light:hover:text-black px-3 py-1 text-[12px] font-medium uppercase tracking-wider transition"
                >
                  {toast.dismissLabel}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

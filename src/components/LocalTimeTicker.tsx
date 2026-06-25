"use client";

import { useEffect, useState } from "react";

/**
 * Footer flourish (canary DNA): a live local-time read. Renders nothing until
 * mounted to avoid a hydration mismatch.
 */
export function LocalTimeTicker({ label = "now" }: { label?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="vk-mono tabular-nums">
      {label} — {time}
    </span>
  );
}

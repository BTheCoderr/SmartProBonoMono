import { clsx } from "clsx";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "info" | "warn" | "urgent";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "neutral" && "bg-ink-100 text-ink-700",
        tone === "info" && "bg-sky-100 text-sky-900",
        tone === "warn" && "bg-amber-100 text-amber-950",
        tone === "urgent" && "bg-red-100 text-red-900",
      )}
    >
      {children}
    </span>
  );
}

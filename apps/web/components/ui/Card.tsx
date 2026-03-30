import { clsx } from "clsx";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-ink-200/80 bg-white p-6 shadow-card sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

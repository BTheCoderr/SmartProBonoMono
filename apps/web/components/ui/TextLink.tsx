import Link from "next/link";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "muted";

const styles: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  secondary:
    "inline-flex items-center justify-center rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-800 transition hover:bg-ink-50",
  muted: "text-sm text-ink-500 hover:text-ink-800",
};

export function TextLink({
  href,
  children,
  variant = "muted",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={clsx(styles[variant], className)}>
      {children}
    </Link>
  );
}

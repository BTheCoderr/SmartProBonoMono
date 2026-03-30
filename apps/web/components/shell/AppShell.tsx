import Link from "next/link";
import { TrustRibbon } from "@/components/shell/TrustRibbon";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f9]">
      <header className="border-b border-ink-200/80 bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight text-accent">
            SmartProBono
          </Link>
          <nav className="flex gap-4 text-sm text-ink-600">
            <Link href="/" className="hover:text-ink-900">
              Topics
            </Link>
            <Link href="/disclaimer" className="hover:text-ink-900">
              Disclaimer
            </Link>
          </nav>
        </div>
      </header>
      <TrustRibbon />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
      <footer className="border-t border-ink-200/80 bg-white py-6 text-center text-xs text-ink-500">
        <p>
          Legal information, not legal advice. SmartProBono does not create an
          attorney–client relationship.
        </p>
      </footer>
    </div>
  );
}

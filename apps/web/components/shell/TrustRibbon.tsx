"use client";

import { useIntakeStore } from "@/store/intakeStore";

export function TrustRibbon() {
  const syncError = useIntakeStore((s) => s.syncError);
  if (!syncError) return null;
  return (
    <div
      role="status"
      className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950"
    >
      {syncError}
    </div>
  );
}

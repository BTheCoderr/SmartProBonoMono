"use client";

import { useEffect, useState } from "react";

/** Avoids hydration mismatches for persisted client state. */
export function useClientMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

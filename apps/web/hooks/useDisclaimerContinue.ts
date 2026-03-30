"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIntakeStore } from "@/store/intakeStore";

export function useDisclaimerContinue() {
  const router = useRouter();
  const acceptDisclaimer = useIntakeStore((s) => s.acceptDisclaimer);
  const alreadyAccepted = useIntakeStore((s) => s.disclaimerAccepted);
  const [checked, setChecked] = useState(alreadyAccepted);

  const continueToIntake = () => {
    acceptDisclaimer();
    router.push("/intake");
  };

  return { checked, setChecked, continueToIntake, canContinue: checked };
}

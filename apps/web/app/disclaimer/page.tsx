"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { DisclaimerSections } from "@/components/disclaimer/DisclaimerSections";
import { DisclaimerAcceptance } from "@/components/disclaimer/DisclaimerAcceptance";
import { useDisclaimerContinue } from "@/hooks/useDisclaimerContinue";

export default function DisclaimerPage() {
  const { checked, setChecked, continueToIntake, canContinue } =
    useDisclaimerContinue();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Disclaimer</h1>
        <p className="mt-2 text-sm text-ink-600">
          Read carefully before continuing. You must accept to use guided intake.
        </p>
      </div>

      <Card className="space-y-4">
        <DisclaimerSections />
        <DisclaimerAcceptance checked={checked} onChange={setChecked} />
        <div className="flex flex-wrap gap-3 pt-2">
          <Button disabled={!canContinue} onClick={continueToIntake}>
            Continue to intake
          </Button>
          <TextLink href="/" variant="secondary">
            Back to home
          </TextLink>
        </div>
      </Card>
    </div>
  );
}

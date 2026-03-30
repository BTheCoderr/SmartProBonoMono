import { TextLink } from "@/components/ui/TextLink";
import { Button } from "@/components/ui/Button";

type Props = {
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
};

export function IntakeFooterNav({ onBack, onNext, isLastStep }: Props) {
  return (
    <div className="flex flex-wrap gap-3 border-t border-ink-100 pt-6">
      <Button type="button" variant="secondary" onClick={onBack}>
        Back
      </Button>
      <Button type="button" onClick={onNext}>
        {isLastStep ? "See results" : "Continue"}
      </Button>
      <TextLink href="/" variant="muted" className="ml-auto self-center">
        Exit to home
      </TextLink>
    </div>
  );
}

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";

export function RiEvictionTopicCard() {
  return (
    <Card className="flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-ink-900">
            Rhode Island — eviction & housing
          </h2>
          <Badge tone="info">First module</Badge>
        </div>
        <p className="text-sm text-ink-600">
          Tenant or landlord triage for notices, court stage, and urgent issues.
          Plain language — not a substitute for legal advice.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <TextLink href="/disclaimer" variant="primary" className="min-w-[140px]">
          Start intake
        </TextLink>
        <TextLink href="/disclaimer" variant="secondary">
          Read disclaimer
        </TextLink>
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/Card";

export function TrustPanel() {
  return (
    <Card className="border-ink-100 bg-ink-50/60">
      <h3 className="text-sm font-semibold text-ink-800">Trust & safety</h3>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-600">
        <li>Information only — not legal advice.</li>
        <li>
          No attorney–client relationship. For emergencies, contact local
          emergency services.
        </li>
        <li>Cloud save is optional and depends on your environment configuration.</li>
      </ul>
    </Card>
  );
}

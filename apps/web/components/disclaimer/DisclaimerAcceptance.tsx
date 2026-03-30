"use client";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function DisclaimerAcceptance({ checked, onChange }: Props) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-ink-200 bg-ink-50/50 p-4 text-sm text-ink-800">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-ink-300"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        I understand this is legal information, not legal advice, and I agree to
        continue.
      </span>
    </label>
  );
}

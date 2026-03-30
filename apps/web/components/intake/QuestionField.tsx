"use client";

import type { QuestionDef } from "@/lib/workflow/modules/ri-eviction/questions";

export function QuestionField({
  q,
  value,
  onChange,
}: {
  q: QuestionDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ink-800">
        {q.label}
      </label>
      {q.helper ? (
        <p className="text-sm text-ink-500">{q.helper}</p>
      ) : null}

      {q.type === "select" && (
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <option value="">Select…</option>
          {q.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {q.type === "boolean" && (
        <select
          value={
            value === true ? "true" : value === false ? "false" : ""
          }
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? null : v === "true");
          }}
          className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <option value="">Select…</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      )}

      {q.type === "number" && (
        <input
          type="number"
          min={0}
          value={typeof value === "number" ? value : ""}
          onChange={(e) => {
            const raw = e.target.value;
            onChange(raw === "" ? null : Number(raw));
          }}
          className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-900 shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      )}
    </div>
  );
}

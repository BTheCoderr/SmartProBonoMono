"use client";

import { clsx } from "clsx";

export function StepProgress({
  steps,
  currentIndex,
}: {
  steps: { key: string; title: string }[];
  currentIndex: number;
}) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex justify-between text-xs font-medium text-ink-500">
        <span>
          Step {currentIndex + 1} of {steps.length}
        </span>
        <span className="hidden sm:inline">{steps[currentIndex]?.title}</span>
      </div>
      <div className="flex gap-1">
        {steps.map((s, i) => (
          <div
            key={s.key}
            className={clsx(
              "h-1.5 flex-1 rounded-full transition",
              i <= currentIndex ? "bg-accent" : "bg-ink-200",
            )}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

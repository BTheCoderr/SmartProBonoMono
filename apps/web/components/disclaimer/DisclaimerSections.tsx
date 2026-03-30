export function DisclaimerSections() {
  return (
    <>
      <section className="space-y-2 text-sm text-ink-700">
        <h2 className="text-base font-semibold text-ink-900">
          Legal information, not legal advice
        </h2>
        <p>
          SmartProBono provides general legal information and triage-style
          organization of your answers. It does <strong>not</strong> provide
          legal advice, predict court outcomes, or tell you what you must do.
        </p>
        <p>
          Laws, court rules, and local practice change. A qualified attorney or
          legal aid advocate can review your specific facts.
        </p>
      </section>

      <section className="space-y-2 text-sm text-ink-700">
        <h2 className="text-base font-semibold text-ink-900">
          No attorney–client relationship
        </h2>
        <p>
          Using this site does not create an attorney–client relationship with
          SmartProBono or its contributors.
        </p>
      </section>

      <section className="space-y-2 text-sm text-ink-700">
        <h2 className="text-base font-semibold text-ink-900">
          Emergencies & safety
        </h2>
        <p>
          If you are in immediate danger, contact local emergency services or a
          trusted crisis resource. This tool is not monitored for emergencies.
        </p>
      </section>

      <section className="space-y-2 text-sm text-ink-700">
        <h2 className="text-base font-semibold text-ink-900">Data</h2>
        <p>
          When configured, answers may be stored to help you resume and improve
          the product. Do not enter sensitive identifiers you do not want
          stored.
        </p>
      </section>
    </>
  );
}

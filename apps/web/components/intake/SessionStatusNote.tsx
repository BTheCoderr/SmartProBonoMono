type Props = {
  sessionId: string | null;
};

export function SessionStatusNote({ sessionId }: Props) {
  if (sessionId) {
    return (
      <p className="text-xs text-ink-400">
        Session:{" "}
        <span className="font-mono" title={sessionId}>
          {sessionId.slice(0, 8)}…
        </span>
      </p>
    );
  }
  return (
    <p className="text-xs text-amber-900/80">
      Local-only: configure Supabase environment variables to save sessions in
      the cloud.
    </p>
  );
}

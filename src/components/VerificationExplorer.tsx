import { CLAIMS, STATUS_META, getClaim } from "../data/claims";

function StatusBadge({ status }: { status: keyof typeof STATUS_META }) {
  const meta = STATUS_META[status];

  return (
    <span className={`status-badge ${meta.className}`}>
      <span className="status-dot" />
      {meta.label}
    </span>
  );
}

export function VerificationExplorer() {
  const claimId = new URLSearchParams(window.location.search).get("claim");
  const claim = claimId ? getClaim(claimId) : undefined;

  if (claimId && claim) {
    const meta = STATUS_META[claim.status];

    return (
      <main className="verification-shell">
        <a className="verification-back" href="/verification">
          ← All claims
        </a>

        <div className="verification-meta-row">
          <StatusBadge status={claim.status} />
          {claim.lastChecked ? (
            <span className="verification-muted">last checked {claim.lastChecked}</span>
          ) : null}
        </div>

        <h1>{claim.title}</h1>

        <section>
          <h2>Statement</h2>
          <p>{claim.statement}</p>
        </section>

        <section>
          <h2>Status meaning</h2>
          <p>{meta.description}</p>
        </section>

        <section>
          <h2>What this establishes</h2>
          <p>{claim.scope}</p>
        </section>

        <section>
          <h2>What this does not establish</h2>
          <p>{claim.limitations}</p>
        </section>

        {claim.artifactUrl ? (
          <section>
            <h2>Artifact</h2>
            <a href={claim.artifactUrl} target="_blank" rel="noreferrer">
              {claim.artifactLabel ?? claim.artifactUrl}
            </a>
          </section>
        ) : null}

        {claim.dependencies?.length ? (
          <section>
            <h2>Depends on</h2>
            <ul>
              {claim.dependencies.map((depId) => {
                const dep = getClaim(depId);
                if (!dep) return null;
                return (
                  <li key={depId}>
                    <a href={`/verification?claim=${depId}`}>{dep.title}</a>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </main>
    );
  }

  return (
    <main className="verification-shell">
      <a className="verification-back" href="/">
        ← Dashboard
      </a>

      <h1>Verification Explorer</h1>
      <p className="verification-lede">
        Every claim below is labeled with its actual epistemic status. Verified surfaces,
        conditional bridges, and open frontiers are separated explicitly.
      </p>

      <div className="verification-table-wrap">
        <table className="verification-table">
          <thead>
            <tr>
              <th>Claim</th>
              <th>Status</th>
              <th>Artifact</th>
              <th>Last checked</th>
            </tr>
          </thead>
          <tbody>
            {CLAIMS.map((claim) => (
              <tr key={claim.id}>
                <td>
                  <a href={`/verification?claim=${claim.id}`}>{claim.title}</a>
                </td>
                <td>
                  <StatusBadge status={claim.status} />
                </td>
                <td>
                  {claim.artifactUrl ? (
                    <a href={claim.artifactUrl} target="_blank" rel="noreferrer">
                      {claim.artifactLabel ?? "artifact"}
                    </a>
                  ) : (
                    <span className="verification-muted">none</span>
                  )}
                </td>
                <td>{claim.lastChecked ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="verification-legend">
        {Object.entries(STATUS_META).map(([status, meta]) => (
          <div key={status}>
            <StatusBadge status={status as keyof typeof STATUS_META} />
            <p>{meta.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

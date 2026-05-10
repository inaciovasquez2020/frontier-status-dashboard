import { VerificationExplorer } from "./components/VerificationExplorer";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import rawRepos from "./data/status-data.json";

export type RepoStatus =
  | "Certified Frontier"
  | "Status-Locked Frontier"
  | "Conditional Frontier"
  | "Proof-Hole Triage"
  | "Sorry-Quarantined"
  | "METADATA_SNAPSHOT_MERGED"
  | "CONDITIONAL_PREFIX_EMBEDDING_REDUCTION";

export type Repo = {
  metadataOnly?: boolean;
  excludeFromMetrics?: boolean;
  name: string;
  domain: string;
  status: RepoStatus;
  integrity: number;
  theoremClosure: number;
  ci: "green" | "yellow" | "red";
  boundary: string;
  url: string;
};

export const repos: Repo[] = rawRepos as Repo[];

export const publicRepos: Repo[] = repos.filter(
  (repo) =>
    !repo.metadataOnly &&
    !repo.excludeFromMetrics &&
    repo.name !== "Internal" &&
    String(repo.status) !== "INTERNAL_AGGREGATE_ONLY",
);

const statusTone: Record<RepoStatus, string> = {
  "Certified Frontier": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Status-Locked Frontier": "bg-blue-50 text-blue-700 border-blue-200",
  "Conditional Frontier": "bg-amber-50 text-amber-700 border-amber-200",
  "Proof-Hole Triage": "bg-orange-50 text-orange-700 border-orange-200",
  "Sorry-Quarantined": "bg-rose-50 text-rose-700 border-rose-200",
  "METADATA_SNAPSHOT_MERGED": "bg-slate-50 text-slate-700 border-slate-200",
  "CONDITIONAL_PREFIX_EMBEDDING_REDUCTION": "bg-amber-50 text-amber-700 border-amber-200",
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function uniqueDomains(items: Repo[]) {
  return ["All", ...Array.from(new Set(items.map((repo) => repo.domain)))];
}

export function filterRepos(items: Repo[], query: string, domain: string) {
  const q = query.trim().toLowerCase();

  return items.filter((repo) => {
    const matchesQuery =
      !q ||
      repo.name.toLowerCase().includes(q) ||
      repo.domain.toLowerCase().includes(q) ||
      repo.status.toLowerCase().includes(q) ||
      repo.boundary.toLowerCase().includes(q);

    const matchesDomain = domain === "All" || repo.domain === domain;

    return matchesQuery && matchesDomain;
  });
}

export function average(values: number[]) {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

type IconName =
  | "shield"
  | "warning"
  | "check"
  | "branch"
  | "search"
  | "external"
  | "activity"
  | "lock";

function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (name === "warning") {
    return (
      <svg {...common}>
        <path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (name === "branch") {
    return (
      <svg {...common}>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M6 9v3a6 6 0 0 0 6 6h3" />
        <path d="M6 9v12" />
      </svg>
    );
  }

  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    );
  }

  if (name === "external") {
    return (
      <svg {...common}>
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      </svg>
    );
  }

  if (name === "activity") {
    return (
      <svg {...common}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-3xl border bg-white shadow-sm", className)}>{children}</div>;
}

function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-base font-medium text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</div>
    </div>
  );
}

function Bar({ value }: { value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div
      className="h-2 w-full rounded-full bg-slate-100"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
    >
      <div className="h-2 rounded-full bg-slate-900" style={{ width: `${safeValue}%` }} />
    </div>
  );
}

export default function FrontierStatusDashboard() {
  if (window.location.pathname.startsWith("/verification")) return <VerificationExplorer />;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const domains = useMemo(() => uniqueDomains(publicRepos), []);
  const filtered = useMemo(() => filterRepos(publicRepos, query, filter), [query, filter]);

  const metricRepos = repos.filter((repo) => !repo.metadataOnly && !repo.excludeFromMetrics);
  const avgIntegrity = average(metricRepos.map((repo) => repo.integrity));
  const avgClosure = average(metricRepos.map((repo) => repo.theoremClosure));
  const greenCount = metricRepos.filter((repo) => repo.ci === "green").length;

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
  <div className="flex gap-4 text-sm">
    <a className="underline underline-offset-4" href="/urf-front-door/">URF Front Door</a>
    <a className="underline underline-offset-4" href="/verification">Verification Explorer</a>
  </div>

      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border bg-white p-8 shadow-sm"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-slate-50 px-3 py-1 text-sm text-slate-600">
                <Icon name="lock" />
                Public claim-boundary dashboard
              </div>
              <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">Frontier Status Dashboard</h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                A deployable product surface for repository integrity, theorem-boundary status, CI health, and external-review readiness across the research program.
              </p>
            </div>
            <Button className="px-5 py-6">Export Status Report</Button>
          </div>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-4">
          <Metric label="Tracked repositories" value={metricRepos.length} />
          <Metric label="Green CI surfaces" value={`${greenCount}/${metricRepos.length}`} />
          <Metric label="Avg. integrity" value={`${avgIntegrity}%`} />
          <Metric label="Avg. theorem closure" value={`${avgClosure}%`} />
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search repository, domain, status, or boundary..."
              className="h-14 w-full rounded-2xl border bg-white pl-12 pr-4 text-base shadow-sm outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Search repositories"
            />
          </div>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="h-14 rounded-2xl border bg-white px-4 text-base shadow-sm outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Filter by domain"
          >
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {filtered.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
            >
              <Card className="h-full">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Icon name="branch" />
                        {repo.domain}
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{repo.name}</h2>
                    </div>
                    <span className={cn("rounded-full border px-3 py-1 text-sm font-medium", statusTone[repo.status])}>
                      {repo.status}
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 rounded-2xl border bg-slate-50 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Repository integrity</span>
                        <span className="font-medium">{repo.integrity}%</span>
                      </div>
                      <Bar value={repo.integrity} />
                    </div>
                    <div className="space-y-2 rounded-2xl border bg-slate-50 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Theorem closure</span>
                        <span className="font-medium">{repo.theoremClosure}%</span>
                      </div>
                      <Bar value={repo.theoremClosure} />
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Icon name={repo.ci === "green" ? "check" : "warning"} />
                      Claim boundary
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{repo.boundary}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm text-slate-600">
                      <Icon name="activity" />
                      CI: {repo.ci}
                    </div>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:underline"
                    >
                      Open repository <Icon name="external" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        <section className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Icon name="shield" className="mt-1 h-5 w-5 text-slate-700" />
            <div>
              <h3 className="text-lg font-semibold">Deployment boundary</h3>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
                This product publishes repository status, CI health, proof-hole visibility, and claim-boundary discipline. It does not represent unresolved mathematical frontiers as solved theorems.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

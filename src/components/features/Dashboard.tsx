"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import AppLayout from "@/components/layout/AppLayout";

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  htmlUrl: string;
  createdAt: string;
  updatedAt: string;
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
  user: {
    login: string;
    avatarUrl: string;
  };
}

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch issues from GitHub
  useEffect(() => {
    async function fetchIssues() {
      try {
        setLoading(true);
        const response = await fetch('/api/issues/mk-162/162-Playbook');
        if (!response.ok) {
          throw new Error('Failed to fetch issues');
        }
        const data = await response.json();
        setIssues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load issues');
      } finally {
        setLoading(false);
      }
    }
    fetchIssues();
  }, []);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.from(".dashboard-card", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".dashboard-header", {
          y: -10,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <AppLayout>
      <div ref={containerRef} className="flex flex-col min-h-full">
        {/* Content Header */}
        <div className="dashboard-header px-4 sm:px-8 pt-6 sm:pt-8 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">162 Playbook Issues</h1>
            <p className="text-[--color-text-muted] mt-1">GitHub Issues from mk-162/162-Playbook</p>
          </div>
        </div>

        {/* Issues List */}
        <div className="flex-1 px-4 sm:px-8 py-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-[--color-text-muted] mt-4">Loading issues...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-4xl text-red-500 mb-2">error</span>
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <div className="dashboard-card bg-[--color-card] border border-[--color-border] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[--color-border] bg-[--color-surface]/30">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-[--color-text-secondary]">
                    {issues.filter(i => i.state === 'open').length} Open Issues • {issues.filter(i => i.state === 'closed').length} Closed
                  </h2>
                </div>
                <ul className="divide-y divide-[--color-border-muted]">
                  {issues.map((issue) => (
                    <li key={issue.id} className="hover:bg-[--color-surface] transition-colors">
                      <a
                        href={issue.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`material-symbols-outlined text-xl mt-0.5 ${
                            issue.state === 'open' ? 'text-green-500' : 'text-purple-500'
                          }`}>
                            {issue.state === 'open' ? 'radio_button_unchecked' : 'check_circle'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-medium text-[--color-text-primary] hover:text-primary transition-colors">
                                {issue.title}
                              </h3>
                              <span className="text-xs text-[--color-text-muted] shrink-0">
                                #{issue.number}
                              </span>
                            </div>
                            {issue.labels.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {issue.labels.map((label) => (
                                  <span
                                    key={label.id}
                                    className="px-2 py-0.5 text-xs rounded-full font-medium"
                                    style={{
                                      backgroundColor: `#${label.color}20`,
                                      color: `#${label.color}`,
                                      border: `1px solid #${label.color}40`
                                    }}
                                  >
                                    {label.name}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-2 mt-2 text-xs text-[--color-text-muted]">
                              <span>by {issue.user.login}</span>
                              <span>•</span>
                              <span>{new Date(issue.updatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

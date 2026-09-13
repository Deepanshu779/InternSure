"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, ArrowRight, Trash2 } from "lucide-react";
import { companies } from "@/data/companies";

export default function SavedPage() {
    const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("internsure-saved-companies");

        if (saved) {
            setSavedSlugs(JSON.parse(saved));
        }
    }, []);

    const savedCompanies = companies.filter((company) =>
        savedSlugs.includes(company.slug)
    );

    const removeCompany = (slug: string) => {
        const updated = savedSlugs.filter((item) => item !== slug);

        setSavedSlugs(updated);
        localStorage.setItem(
            "internsure-saved-companies",
            JSON.stringify(updated)
        );
    };

    return (
        <main className="min-h-screen">
            <section className="border-b border-[var(--border)]">
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <p className="text-sm font-medium text-[var(--primary)]">
                        Your shortlist
                    </p>

                    <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                        Saved companies
                    </h1>

                    <p className="mt-4 max-w-2xl text-[var(--muted-foreground)]">
                        Keep companies you're interested in one place so you can compare
                        them before applying.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-10">
                {savedCompanies.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center">
                        <Bookmark className="mx-auto h-8 w-8 text-[var(--muted-foreground)]" />

                        <h2 className="mt-4 text-lg font-semibold">
                            No saved companies yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted-foreground)]">
                            Save companies while researching internships and they will
                            appear here.
                        </p>

                        <Link
                            href="/companies"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)]"
                        >
                            Explore companies
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2">
                        {savedCompanies.map((company) => (
                            <article
                                key={company.slug}
                                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {company.name}
                                        </h2>

                                        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                                            {company.location}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => removeCompany(company.slug)}
                                        aria-label={`Remove ${company.name}`}
                                        className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                <p className="mt-5 text-sm leading-6 text-[var(--muted-foreground)]">
                                    {company.description}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {company.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-[var(--muted)] px-3 py-1 text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={`/company/${company.slug}`}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
                                >
                                    View company
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
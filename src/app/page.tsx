"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { companies } from "@/data/companies";

export default function Home() {
    const [search, setSearch] = useState("");

    const results =
        search.trim().length > 0
            ? companies.filter((company) => {
                const query = search.toLowerCase();

                return (
                    company.name.toLowerCase().includes(query) ||
                    company.description.toLowerCase().includes(query) ||
                    company.tags.some((tag) => tag.toLowerCase().includes(query))
                );
            })
            : [];

    return (
        <div>
            {/* Hero */}
            <section className="border-b border-[var(--border)]">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
                    <div className="max-w-3xl">
                        <p className="mb-4 text-sm font-medium text-[var(--primary)]">
                            Internship verification platform
                        </p>

                        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                            Know the company
                            <br />
                            before you join.
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
                            Verify companies, compare internships, and learn from real
                            student experiences before you give your time, money, or trust.
                        </p>

                        {/* Search */}
                        <div className="relative mt-8 max-w-2xl">
                            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-4 shadow-sm">
                                <Search className="h-5 w-5 shrink-0 text-[var(--muted-foreground)]" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search a company, role, or skill..."
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted-foreground)]"
                                />
                            </div>

                            {/* Search results */}
                            {search.trim() && (
                                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-lg">
                                    {results.length > 0 ? (
                                        results.map((company) => (
                                            <Link
                                                key={company.slug}
                                                href={`/company/${company.slug}`}
                                                className="flex items-center justify-between border-b border-[var(--border)] p-4 last:border-0 hover:bg-[var(--muted)]"
                                            >
                                                <div>
                                                    <p className="font-medium">{company.name}</p>
                                                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                                                        {company.location}
                                                    </p>
                                                </div>

                                                <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)]" />
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="p-5">
                                            <p className="font-medium">No company found</p>
                                            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                                                Try searching for another company or skill.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted-foreground)]">
                            <span>✓ Company verification</span>
                            <span>✓ Student experiences</span>
                            <span>✓ Offer checking</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="border-b border-[var(--border)]">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium text-[var(--primary)]">
                            How InternSure works
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                            Make better internship decisions.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {[
                            {
                                number: "01",
                                title: "Verify",
                                description:
                                    "Check available company information, internship details, and verification signals.",
                            },
                            {
                                number: "02",
                                title: "Compare",
                                description:
                                    "Compare internship quality, company information, and student experiences.",
                            },
                            {
                                number: "03",
                                title: "Decide",
                                description:
                                    "Use the available evidence to decide whether an opportunity is right for you.",
                            },
                        ].map((item) => (
                            <div
                                key={item.number}
                                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
                            >
                                <span className="text-sm font-medium text-[var(--muted-foreground)]">
                                    {item.number}
                                </span>

                                <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>

                                <p className="mt-3 leading-7 text-[var(--muted-foreground)]">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Offer checker */}
            <section>
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-8 sm:p-12">
                        <div className="max-w-2xl">
                            <p className="text-sm font-medium text-[var(--primary)]">
                                Have an offer already?
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                                Check it before you accept.
                            </h2>

                            <p className="mt-4 leading-7 text-[var(--muted-foreground)]">
                                Upload an internship offer and review the information and
                                warning signals that should be checked before proceeding.
                            </p>

                            <Link
                                href="/check-offer"
                                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:opacity-90"
                            >
                                Check an offer
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
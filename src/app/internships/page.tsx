"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Clock, ArrowRight } from "lucide-react";
import { companies } from "@/data/companies";

export default function InternshipsPage() {
    const [search, setSearch] = useState("");
    const [domain, setDomain] = useState("All");

    const domains = [
        "All",
        "Software",
        "Data",
        "AI/ML",
        "Web Development",
        "Cloud",
        "DevOps",
    ];

    const internships = useMemo(() => {
        return companies
            .map((company) => ({
                ...company,
                role:
                    company.tags.includes("Data") || company.tags.includes("AI/ML")
                        ? "Data & AI Intern"
                        : company.tags.includes("Cloud") || company.tags.includes("DevOps")
                            ? "Cloud & DevOps Intern"
                            : "Software Development Intern",
                duration: "2–3 months",
                mode: "Hybrid / Remote",
            }))
            .filter((internship) => {
                const matchesSearch =
                    internship.name.toLowerCase().includes(search.toLowerCase()) ||
                    internship.role.toLowerCase().includes(search.toLowerCase()) ||
                    internship.tags.some((tag) =>
                        tag.toLowerCase().includes(search.toLowerCase())
                    );

                const matchesDomain =
                    domain === "All" || internship.tags.includes(domain);

                return matchesSearch && matchesDomain;
            });
    }, [search, domain]);

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="border-b border-[var(--border)] bg-[var(--background)]">
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <p className="mb-3 text-sm font-medium text-[var(--primary)]">
                        Discover internships
                    </p>

                    <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                        Find internships worth your time.
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
                        Explore internship opportunities and understand the company,
                        internship quality, and available information before applying.
                    </p>

                    {/* Search */}
                    <div className="mt-8 flex max-w-3xl items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm">
                        <Search className="h-5 w-5 text-[var(--muted-foreground)]" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search internships, companies, or skills..."
                            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted-foreground)]"
                        />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="mx-auto max-w-6xl px-6 py-10">
                {/* Filters */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {domains.map((item) => (
                        <button
                            key={item}
                            onClick={() => setDomain(item)}
                            className={`rounded-full border px-4 py-2 text-sm transition ${domain === item
                                ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                                : "border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Internship opportunities</h2>
                        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                            Demo opportunities — real listings will be connected later.
                        </p>
                    </div>

                    <span className="text-sm text-[var(--muted-foreground)]">
                        {internships.length} found
                    </span>
                </div>

                {/* Cards */}
                <div className="grid gap-5 md:grid-cols-2">
                    {internships.map((internship) => (
                        <article
                            key={internship.slug}
                            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold">
                                            {internship.role}
                                        </h3>

                                        <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs">
                                            Demo
                                        </span>
                                    </div>

                                    <p className="mt-1 text-sm font-medium text-[var(--primary)]">
                                        {internship.name}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-[var(--muted)] px-3 py-2 text-center">
                                    <div className="text-lg font-semibold">
                                        {internship.internshipQualityScore}
                                    </div>
                                    <div className="text-[10px] text-[var(--muted-foreground)]">
                                        Quality
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    {internship.location}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {internship.duration}
                                </span>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {internship.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-[var(--muted)] px-3 py-1 text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--muted)] p-4">
                                <p className="text-sm font-semibold">Why this internship?</p>

                                <div className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
                                    <p>✓ Company information is available</p>
                                    <p>✓ Internship domain is clearly identified</p>
                                    <p>✓ Internship duration is provided</p>
                                </div>

                                <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                                    Demo recommendation factors. InternSure will use verified evidence
                                    and student experiences for real recommendations.
                                </p>
                            </div>

                            <div className="mt-6 border-t border-[var(--border)] pt-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-[var(--muted-foreground)]">
                                            Company trust score
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {internship.trustScore}/100
                                        </p>
                                    </div>

                                    <Link
                                        href={`/company/${internship.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
                                    >
                                        View company
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {internships.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center">
                        <h3 className="font-semibold">No internships found</h3>
                        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                            Try another search or remove the selected filter.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}
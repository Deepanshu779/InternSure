"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import CompanyCard from "@/components/CompanyCard";
import { companies } from "@/data/companies";

export default function CompaniesPage() {
    const [search, setSearch] = useState("");

    const filteredCompanies = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return companies;
        }

        return companies.filter((company) => {
            return (
                company.name.toLowerCase().includes(query) ||
                company.description.toLowerCase().includes(query) ||
                company.tags.some((tag) =>
                    tag.toLowerCase().includes(query)
                )
            );
        });
    }, [search]);

    return (
        <main className="min-h-screen">
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
                    <p className="text-sm font-medium text-primary">
                        Company directory
                    </p>

                    <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Find a company you can trust.
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                        Explore company information, internship quality, and student
                        experiences before making your decision.
                    </p>

                    <div className="mt-8 flex max-w-2xl items-center rounded-xl border border-border bg-background p-1.5 shadow-sm focus-within:border-primary/50">
                        <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />

                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search companies, skills, or industries..."
                            className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                        />

                        <button
                            type="button"
                            className="flex h-12 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            <span className="hidden sm:inline">Filter</span>
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold">
                                Companies
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {filteredCompanies.length} result
                                {filteredCompanies.length === 1 ? "" : "s"}
                            </p>
                        </div>
                    </div>

                    {filteredCompanies.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {filteredCompanies.map((company) => (
                                <CompanyCard
                                    key={company.id}
                                    company={company}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
                            <h3 className="font-semibold">
                                No companies found
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Try searching with a different company name or skill.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
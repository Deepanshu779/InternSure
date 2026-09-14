"use client";

import {
    Search,
    SlidersHorizontal,
    Loader2,
    MapPin,
    Building2,
    ShieldCheck,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Company {
    id: number;
    name: string;
    slug: string;
    website: string | null;
    location: string | null;
    description: string | null;
    industry: string | null;
    verification_status:
    | "verified"
    | "unverified"
    | "under_review"
    | "needs_attention";
    verification_note: string | null;
}

export default function CompaniesPage() {
    const [search, setSearch] = useState("");
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCompanies();
    }, []);

    async function loadCompanies() {
        setLoading(true);
        setError("");

        const { data, error } = await supabase
            .from("companies")
            .select(
                `
        id,
        name,
        slug,
        website,
        location,
        description,
        industry,
        verification_status,
        verification_note
        `
            )
            .order("name", { ascending: true });

        if (error) {
            console.error("Company loading error:", error);
            setError("Could not load companies.");
            setLoading(false);
            return;
        }

        setCompanies((data as Company[]) || []);
        setLoading(false);
    }

    const filteredCompanies = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return companies;
        }

        return companies.filter((company) => {
            return (
                company.name.toLowerCase().includes(query) ||
                company.description?.toLowerCase().includes(query) ||
                company.industry?.toLowerCase().includes(query) ||
                company.location?.toLowerCase().includes(query)
            );
        });
    }, [search, companies]);

    function getVerificationLabel(status: Company["verification_status"]) {
        switch (status) {
            case "verified":
                return "Verified";

            case "under_review":
                return "Under review";

            case "needs_attention":
                return "Needs attention";

            default:
                return "Unverified";
        }
    }

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
                            placeholder="Search companies, industries, or locations..."
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
                    <div className="mb-6">
                        <h2 className="font-semibold">Companies</h2>

                        {!loading && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                {filteredCompanies.length} result
                                {filteredCompanies.length === 1 ? "" : "s"}
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex min-h-64 items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : error ? (
                        <div className="rounded-xl border border-border bg-card px-6 py-12 text-center">
                            <h3 className="font-semibold">
                                Unable to load companies
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={loadCompanies}
                                className="mt-5 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                            >
                                Try again
                            </button>
                        </div>
                    ) : filteredCompanies.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {filteredCompanies.map((company) => (
                                <Link
                                    key={company.id}
                                    href={`/company/${company.slug}`}
                                    className="group rounded-2xl border border-border bg-card p-6 transition hover:border-foreground/20 hover:shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted">
                                            <Building2 className="h-5 w-5" />
                                        </div>

                                        <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                            {getVerificationLabel(
                                                company.verification_status
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="mt-5 text-lg font-semibold tracking-tight">
                                        {company.name}
                                    </h3>

                                    {company.industry && (
                                        <p className="mt-1 text-sm font-medium text-primary">
                                            {company.industry}
                                        </p>
                                    )}

                                    {company.location && (
                                        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            {company.location}
                                        </div>
                                    )}

                                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                        {company.description ||
                                            "Company information is currently being reviewed."}
                                    </p>

                                    <div className="mt-6 border-t border-border pt-4">
                                        <span className="text-sm font-medium transition-colors group-hover:text-primary">
                                            View company →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
                            <h3 className="font-semibold">
                                No companies found
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                Try searching with a different company name,
                                industry, or location.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
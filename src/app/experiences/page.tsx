"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    ArrowUpRight,
    Loader2,
    Search,
    ShieldCheck,
    Star,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Experience {
    id: number;
    company_name: string;
    role: string;
    duration: string | null;
    internship_year: number | null;
    title: string;
    description: string;
    overall_rating: number | null;
    status: string;
}

export default function ExperiencesPage() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadExperiences();
    }, []);

    async function loadExperiences() {
        const { data, error } = await supabase
            .from("experiences")
            .select(
                `
        id,
        company_name,
        role,
        duration,
        internship_year,
        title,
        description,
        overall_rating,
        status
        `
            )
            .eq("status", "published")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Experience loading error:", error);
            setLoading(false);
            return;
        }

        setExperiences(data || []);
        setLoading(false);
    }

    const filteredExperiences = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return experiences;
        }

        return experiences.filter((experience) => {
            return (
                experience.company_name.toLowerCase().includes(query) ||
                experience.role.toLowerCase().includes(query) ||
                experience.title.toLowerCase().includes(query) ||
                experience.description.toLowerCase().includes(query)
            );
        });
    }, [search, experiences]);

    return (
        <main className="min-h-screen">
            {/* Header */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
                    <p className="text-sm font-medium text-primary">
                        Student experiences
                    </p>

                    <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Learn from students who were there.
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                        Read published internship experiences and understand what
                        students actually worked on, learned, and experienced.
                    </p>

                    <div className="mt-8 flex max-w-2xl items-center rounded-xl border border-border bg-background p-1.5 shadow-sm focus-within:border-primary/50">
                        <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />

                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search companies, roles, or experiences..."
                            className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                </div>
            </section>

            {/* Experiences */}
            <section>
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="font-semibold">
                                Published experiences
                            </h2>

                            {!loading && (
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {filteredExperiences.length} experience
                                    {filteredExperiences.length === 1 ? "" : "s"}
                                </p>
                            )}
                        </div>

                        <Link
                            href="/experiences/share"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            Share your experience
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex min-h-64 items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : filteredExperiences.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                            <ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground" />

                            <h3 className="mt-4 font-semibold">
                                No published experiences yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                Published student experiences will appear here after
                                they have been reviewed by InternSure.
                            </p>

                            <Link
                                href="/experiences/share"
                                className="mt-5 inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                            >
                                Share your experience
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2">
                            {filteredExperiences.map((experience) => (
                                <article
                                    key={experience.id}
                                    className="rounded-2xl border border-border bg-card p-6"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-primary">
                                                {experience.company_name}
                                            </p>

                                            <h3 className="mt-2 text-xl font-semibold tracking-tight">
                                                {experience.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {experience.role}
                                                {experience.duration
                                                    ? ` • ${experience.duration}`
                                                    : ""}
                                                {experience.internship_year
                                                    ? ` • ${experience.internship_year}`
                                                    : ""}
                                            </p>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-sm">
                                            <Star className="h-4 w-4" />
                                            {experience.overall_rating ?? "—"}
                                        </div>
                                    </div>

                                    <p className="mt-5 line-clamp-4 text-sm leading-6 text-muted-foreground">
                                        {experience.description}
                                    </p>

                                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                            <ShieldCheck className="h-4 w-4" />
                                            Published after review
                                        </span>

                                        <Link
                                            href={`/companies`}
                                            className="text-sm font-medium hover:underline"
                                        >
                                            Find company
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Trust message */}
            <section className="border-t border-border">
                <div className="mx-auto max-w-3xl px-6 py-12 text-center">
                    <ShieldCheck className="mx-auto h-7 w-7" />

                    <h2 className="mt-4 text-xl font-semibold">
                        Built around student experiences
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Experiences submitted to InternSure are reviewed before
                        publication. We aim to give students useful information
                        without presenting individual experiences as absolute
                        facts about a company.
                    </p>
                </div>
            </section>
        </main>
    );
}
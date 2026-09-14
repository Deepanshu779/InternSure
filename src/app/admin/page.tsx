"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Loader2,
    ShieldCheck,
    ShieldX,
    Check,
    X,
} from "lucide-react";

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
    created_at: string;
}

export default function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    useEffect(() => {
        checkAdmin();
    }, []);

    async function checkAdmin() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            window.location.href = "/login";
            return;
        }

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profileError || profile?.role !== "admin") {
            setLoading(false);
            setAuthorized(false);
            return;
        }

        setAuthorized(true);

        await loadPendingExperiences();

        setLoading(false);
    }

    async function loadPendingExperiences() {
        const { data, error } = await supabase
            .from("experiences")
            .select("*")
            .eq("status", "pending")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Could not load experiences:", error);
            return;
        }

        setExperiences(data || []);
    }

    async function updateStatus(
        experienceId: number,
        status: "published" | "rejected"
    ) {
        setUpdatingId(experienceId);

        const { error } = await supabase
            .from("experiences")
            .update({ status })
            .eq("id", experienceId);

        if (error) {
            console.error("Moderation error:", error);
            alert(`Could not update submission: ${error.message}`);
            setUpdatingId(null);
            return;
        }

        setExperiences((current) =>
            current.filter((experience) => experience.id !== experienceId)
        );

        setUpdatingId(null);
    }

    if (loading) {
        return (
            <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6">
                <Loader2 className="h-6 w-6 animate-spin" />
            </main>
        );
    }

    if (!authorized) {
        return (
            <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-6">
                <div className="w-full rounded-2xl border border-border bg-card p-8 text-center">
                    <ShieldX className="mx-auto mb-4 h-10 w-10" />

                    <h1 className="text-2xl font-semibold">
                        Access denied
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        You do not have permission to access the InternSure
                        admin dashboard.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <div className="mb-10">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                    <ShieldCheck className="h-4 w-4" />
                    Admin Dashboard
                </div>

                <h1 className="text-3xl font-semibold tracking-tight">
                    Experience moderation
                </h1>

                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Review student experiences before they become publicly
                    visible on InternSure.
                </p>
            </div>

            <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-sm">
                    <span className="font-medium">
                        {experiences.length}
                    </span>{" "}
                    experience
                    {experiences.length !== 1 ? "s" : ""} waiting for
                    review.
                </p>
            </div>

            {experiences.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-10 text-center">
                    <ShieldCheck className="mx-auto mb-4 h-8 w-8" />

                    <h2 className="text-lg font-semibold">
                        No pending experiences
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        New student submissions will appear here for
                        moderation.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {experiences.map((experience) => {
                        const isUpdating = updatingId === experience.id;

                        return (
                            <article
                                key={experience.id}
                                className="rounded-2xl border border-border bg-card p-6"
                            >
                                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <div className="mb-2 text-sm text-muted-foreground">
                                            Pending review
                                        </div>

                                        <h2 className="text-xl font-semibold">
                                            {experience.title}
                                        </h2>

                                        <p className="mt-1 text-sm font-medium">
                                            {experience.company_name}
                                        </p>

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

                                    {experience.overall_rating && (
                                        <div className="rounded-lg border border-border px-4 py-2 text-sm">
                                            Rating:{" "}
                                            <span className="font-semibold">
                                                {experience.overall_rating}/5
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 border-t border-border pt-5">
                                    <h3 className="text-sm font-semibold">
                                        Student experience
                                    </h3>

                                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                                        {experience.description}
                                    </p>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        disabled={isUpdating}
                                        onClick={() =>
                                            updateStatus(
                                                experience.id,
                                                "published"
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isUpdating ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Check className="h-4 w-4" />
                                        )}

                                        Approve
                                    </button>

                                    <button
                                        type="button"
                                        disabled={isUpdating}
                                        onClick={() =>
                                            updateStatus(
                                                experience.id,
                                                "rejected"
                                            )
                                        }
                                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <X className="h-4 w-4" />
                                        Reject
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </main>
    );
}
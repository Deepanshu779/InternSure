"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

interface SaveCompanyButtonProps {
    slug: string;
}

export default function SaveCompanyButton({
    slug,
}: SaveCompanyButtonProps) {
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("internsure-saved-companies");

        if (stored) {
            const savedCompanies: string[] = JSON.parse(stored);
            setSaved(savedCompanies.includes(slug));
        }
    }, [slug]);

    const toggleSaved = () => {
        const stored = localStorage.getItem("internsure-saved-companies");

        const savedCompanies: string[] = stored ? JSON.parse(stored) : [];

        const updated = saved
            ? savedCompanies.filter((item) => item !== slug)
            : [...savedCompanies, slug];

        localStorage.setItem(
            "internsure-saved-companies",
            JSON.stringify(updated)
        );

        setSaved(!saved);
    };

    return (
        <button
            onClick={toggleSaved}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--muted)]"
        >
            <Bookmark
                className="h-4 w-4"
                fill={saved ? "currentColor" : "none"}
            />

            {saved ? "Saved" : "Save company"}
        </button>
    );
}
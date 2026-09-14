"use client";

import { useEffect, useState } from "react";
import { Bookmark, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface SaveCompanyButtonProps {
    slug: string;
}

export default function SaveCompanyButton({
    slug,
}: SaveCompanyButtonProps) {
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const checkSaved = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                return;
            }

            const { data } = await supabase
                .from("saved_companies")
                .select("id")
                .eq("user_id", user.id)
                .eq("company_slug", slug)
                .maybeSingle();

            setSaved(!!data);
            setLoading(false);
        };

        checkSaved();
    }, [slug]);

    const toggleSaved = async () => {
        alert("Save button clicked!");
        setSaving(true);

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        console.log("Current user:", user);
        console.log("User error:", userError);

        if (userError || !user) {
            setSaving(false);
            alert("You are not logged in. Please log in again.");
            return;
        }

        if (saved) {
            const { error } = await supabase
                .from("saved_companies")
                .delete()
                .eq("user_id", user.id)
                .eq("company_slug", slug);

            console.log("Delete error:", error);

            if (error) {
                alert(`Could not remove company: ${error.message}`);
            } else {
                setSaved(false);
            }
        } else {
            const { data, error } = await supabase
                .from("saved_companies")
                .insert({
                    user_id: user.id,
                    company_slug: slug,
                })
                .select();

            console.log("Insert result:", data);
            console.log("Insert error:", error);

            if (error) {
                alert(`Could not save company: ${error.message}`);
            } else {
                setSaved(true);
            }
        }

        setSaving(false);
    };

    if (loading) {
        return (
            <button
                disabled
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm opacity-60"
            >
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
            </button>
        );
    }

    return (
        <button
            onClick={toggleSaved}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--muted)] disabled:opacity-60"
        >
            {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Bookmark
                    className="h-4 w-4"
                    fill={saved ? "currentColor" : "none"}
                />
            )}

            {saved ? "Saved" : "Save company"}
        </button>
    );
}
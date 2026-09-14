"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, LogOut, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [college, setCollege] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                window.location.href = "/login";
                return;
            }

            setUserId(user.id);
            setEmail(user.email ?? "");

            const { data } = await supabase
                .from("profiles")
                .select("full_name, college")
                .eq("id", user.id)
                .maybeSingle();

            if (data) {
                setFullName(data.full_name ?? "");
                setCollege(data.college ?? "");
            }

            setLoading(false);
        };

        loadProfile();
    }, []);

    const saveProfile = async (event: FormEvent) => {
        event.preventDefault();

        setSaving(true);
        setMessage("");

        const { error } = await supabase.from("profiles").upsert({
            id: userId,
            full_name: fullName,
            college,
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Profile saved successfully.");
        }

        setSaving(false);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    if (loading) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <section className="border-b border-[var(--border)]">
                <div className="mx-auto max-w-4xl px-6 py-14">
                    <p className="text-sm font-medium text-[var(--primary)]">
                        Account
                    </p>

                    <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                        Your profile
                    </h1>

                    <p className="mt-3 text-[var(--muted-foreground)]">
                        Manage your InternSure account information.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-6 py-10">
                <form
                    onSubmit={saveProfile}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
                >
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Email
                            </label>

                            <input
                                value={email}
                                disabled
                                className="w-full rounded-lg border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm opacity-70"
                            />

                            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                                Your email is managed by your authentication account.
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Full name
                            </label>

                            <input
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                placeholder="Your name"
                                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                College / University
                            </label>

                            <input
                                value={college}
                                onChange={(event) => setCollege(event.target.value)}
                                placeholder="Your college or university"
                                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        </div>

                        {message && (
                            <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)] p-3 text-sm">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] disabled:opacity-60"
                        >
                            {saving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}

                            {saving ? "Saving..." : "Save profile"}
                        </button>
                    </div>
                </form>

                <div className="mt-6 rounded-2xl border border-[var(--border)] p-6">
                    <h2 className="font-semibold">Sign out</h2>

                    <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                        Sign out of your InternSure account on this device.
                    </p>

                    <button
                        type="button"
                        onClick={logout}
                        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-medium hover:bg-[var(--muted)]"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign out
                    </button>
                </div>
            </section>
        </main>
    );
}
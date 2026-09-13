"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Loader2 } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSignup = async (event: FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setMessage("");

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage(
                "Account created. Check your email if confirmation is required."
            );
        }

        setLoading(false);
    };

    return (
        <main className="flex min-h-[75vh] items-center justify-center px-6 py-16">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <p className="text-sm font-medium text-[var(--primary)]">
                        Get started
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                        Create your InternSure account
                    </h1>

                    <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                        Save companies, share experiences, and build your internship
                        shortlist.
                    </p>
                </div>

                <form
                    onSubmit={handleSignup}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm"
                >
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="At least 6 characters"
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
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading && <Loader2 className="h-4 w-4 animate-spin" />}

                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-[var(--primary)] hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}
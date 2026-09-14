"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, UserCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
            setLoading(false);
        };

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center"
                    aria-label="InternSure home"
                >
                    <img
                        src="/images/internsure-logo.png"
                        alt="InternSure"
                        className="h-9 w-auto"
                    />
                </Link>

                {/* Navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link
                        href="/companies"
                        className="text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                    >
                        Companies
                    </Link>

                    <Link
                        href="/internships"
                        className="text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                    >
                        Internships
                    </Link>

                    <Link
                        href="/check-offer"
                        className="text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                    >
                        Check an Offer
                    </Link>

                    <Link
                        href="/experiences"
                        className="text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
                    >
                        Experiences
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {!loading && user && (
                        <>
                            <Link
                                href="/saved"
                                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-[var(--muted)]"
                                title="Saved companies"
                            >
                                <Bookmark className="h-4 w-4" />
                                <span className="hidden sm:inline">Saved</span>
                            </Link>

                            <Link
                                href="/profile"
                                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-[var(--muted)]"
                            >
                                <UserCircle className="h-4 w-4" />
                                <span className="hidden sm:inline">Profile</span>
                            </Link>
                        </>
                    )}

                    {!loading && !user && (
                        <Link
                            href="/login"
                            className="rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition hover:opacity-90"
                        >
                            Sign in
                        </Link>
                    )}

                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
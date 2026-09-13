"use client";

import {
    ArrowLeft,
    CheckCircle2,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ShareExperiencePage() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <main className="min-h-screen">
                <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-2xl items-center px-6 py-16">
                    <div className="w-full rounded-2xl border border-border bg-background p-8 text-center sm:p-12">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                            <CheckCircle2 className="h-7 w-7 text-success" />
                        </div>

                        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
                            Experience submitted
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                            Thank you for helping other students make better
                            internship decisions. Your experience will go through
                            InternSure's verification and moderation process before
                            publication.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/companies"
                                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                            >
                                Explore companies
                            </Link>

                            <Link
                                href="/"
                                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted"
                            >
                                Back home
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            {/* Header */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
                    <Link
                        href="/experiences"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to experiences
                    </Link>

                    <p className="mt-8 text-sm font-medium text-primary">
                        Student experiences
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Share your internship experience
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                        Your experience can help another student decide whether
                        an internship is worth their time and effort.
                    </p>

                    {/* Privacy notice */}
                    <div className="mt-7 flex gap-3 rounded-xl border border-border bg-muted/40 p-4">
                        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                        <div>
                            <p className="text-sm font-medium">
                                Your privacy matters
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                We won't publicly display your personal contact
                                information. Some information may be requested
                                privately to verify that an experience is genuine.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section>
                <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8 lg:py-14">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Internship information */}
                        <div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold">
                                    Internship details
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Tell us about the internship you completed.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    label="Company name"
                                    name="company"
                                    placeholder="e.g. TechNova Labs"
                                    required
                                />

                                <Field
                                    label="Internship role"
                                    name="role"
                                    placeholder="e.g. Software Engineer Intern"
                                    required
                                />

                                <Field
                                    label="Duration"
                                    name="duration"
                                    placeholder="e.g. 8 weeks"
                                    required
                                />

                                <Field
                                    label="Year"
                                    name="year"
                                    placeholder="e.g. 2026"
                                    required
                                />
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="border-t border-border pt-10">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold">
                                    Your experience
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Give students an honest picture of what you
                                    experienced.
                                </p>
                            </div>

                            <div className="space-y-5">
                                <Field
                                    label="Experience title"
                                    name="title"
                                    placeholder="e.g. Great learning experience"
                                    required
                                />

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="text-sm font-medium"
                                    >
                                        Describe your experience
                                    </label>

                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows={6}
                                        placeholder="What did you work on? How was the mentorship? Was the internship different from what was promised?"
                                        className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-3.5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="border-t border-border pt-10">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold">
                                    Rate your experience
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Rate each area separately instead of giving only
                                    one overall rating.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <RatingField
                                    label="Overall experience"
                                    name="overall"
                                />

                                <RatingField
                                    label="Real-world projects"
                                    name="projects"
                                />

                                <RatingField
                                    label="Mentorship"
                                    name="mentorship"
                                />

                                <RatingField
                                    label="Communication"
                                    name="communication"
                                />

                                <RatingField
                                    label="Stipend experience"
                                    name="stipend"
                                />

                                <RatingField
                                    label="Learning opportunity"
                                    name="learning"
                                />
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="border-t border-border pt-10">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold">
                                    Payment information
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    This helps us identify internships that require
                                    students to pay money.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="payment"
                                    className="text-sm font-medium"
                                >
                                    Did you have to pay the company or an associated
                                    organization?
                                </label>

                                <select
                                    id="payment"
                                    name="payment"
                                    required
                                    defaultValue=""
                                    className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary/50 sm:w-full"
                                >
                                    <option value="" disabled>
                                        Select an option
                                    </option>
                                    <option value="no">
                                        No payment was required
                                    </option>
                                    <option value="yes">
                                        Yes, I paid money
                                    </option>
                                    <option value="other">
                                        There was another type of payment
                                    </option>
                                    <option value="unknown">
                                        I'm not sure
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* Verification */}
                        <div className="border-t border-border pt-10">
                            <div className="rounded-xl border border-border bg-muted/30 p-5">
                                <div className="flex gap-3">
                                    <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />

                                    <div>
                                        <h3 className="text-sm font-semibold">
                                            Help us keep experiences trustworthy
                                        </h3>

                                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                            InternSure may ask for additional information
                                            to verify that you actually completed the
                                            internship. Verification does not mean that
                                            your review will automatically be published.
                                        </p>
                                    </div>
                                </div>

                                <label className="mt-5 flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        required
                                        className="mt-0.5 h-4 w-4 rounded border-border"
                                    />

                                    <span className="text-xs leading-5 text-muted-foreground">
                                        I confirm that this experience is based on my
                                        own internship experience and that I have
                                        provided information honestly.
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col-reverse gap-3 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs text-muted-foreground">
                                Your submission will be reviewed before publication.
                            </p>

                            <button
                                type="submit"
                                className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                            >
                                Submit experience
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

function Field({
    label,
    name,
    placeholder,
    required = false,
}: {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="text-sm font-medium"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type="text"
                required={required}
                placeholder={placeholder}
                className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
            />
        </div>
    );
}

function RatingField({
    label,
    name,
}: {
    label: string;
    name: string;
}) {
    return (
        <div className="rounded-xl border border-border p-4">
            <label
                htmlFor={name}
                className="text-sm font-medium"
            >
                {label}
            </label>

            <select
                id={name}
                name={name}
                required
                defaultValue=""
                className="mt-3 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary/50"
            >
                <option value="" disabled>
                    Select rating
                </option>

                <option value="5">5 — Excellent</option>
                <option value="4">4 — Good</option>
                <option value="3">3 — Average</option>
                <option value="2">2 — Poor</option>
                <option value="1">1 — Very poor</option>
            </select>
        </div>
    );
}
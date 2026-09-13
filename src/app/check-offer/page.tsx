"use client";

import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    FileText,
    LockKeyhole,
    ShieldCheck,
    Upload,
    X,
} from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

type AnalysisState = "idle" | "analyzing" | "complete";

export default function CheckOfferPage() {
    const [file, setFile] = useState<File | null>(null);
    const [analysisState, setAnalysisState] =
        useState<AnalysisState>("idle");

    function handleFileChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);
        setAnalysisState("idle");
    }

    function removeFile() {
        setFile(null);
        setAnalysisState("idle");
    }

    function analyzeOffer() {
        if (!file) {
            return;
        }

        setAnalysisState("analyzing");

        // Demo analysis.
        // Real document processing will be connected later.
        setTimeout(() => {
            setAnalysisState("complete");
        }, 1500);
    }

    return (
        <main className="min-h-screen">
            {/* Header */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8 lg:py-20">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>

                    <p className="mt-7 text-sm font-medium text-primary">
                        Internship offer checker
                    </p>

                    <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                        Understand your offer
                        <br />
                        before you accept it.
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        Upload your internship offer letter to extract important
                        details and identify information that may need closer
                        verification.
                    </p>
                </div>
            </section>

            {/* Upload */}
            <section>
                <div className="mx-auto max-w-4xl px-6 py-10 lg:px-8 lg:py-14">
                    <div className="rounded-2xl border border-border bg-background">
                        <div className="border-b border-border p-6 sm:p-8">
                            <h2 className="font-semibold">
                                Upload your offer letter
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                PDF, JPG, or PNG up to 10 MB.
                            </p>
                        </div>

                        <div className="p-6 sm:p-8">
                            {!file ? (
                                <label
                                    htmlFor="offer-upload"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-14 text-center transition-colors hover:border-primary/50 hover:bg-muted/30"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                                        <Upload className="h-5 w-5 text-muted-foreground" />
                                    </div>

                                    <p className="mt-5 text-sm font-medium">
                                        Choose your offer letter
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        or drag and drop it here
                                    </p>

                                    <span className="mt-5 rounded-lg border border-border px-4 py-2 text-sm font-medium">
                                        Browse files
                                    </span>

                                    <input
                                        id="offer-upload"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            ) : (
                                <div className="rounded-xl border border-border p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex min-w-0 gap-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                                                <FileText className="h-5 w-5 text-muted-foreground" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">
                                                    {file.name}
                                                </p>

                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            aria-label="Remove file"
                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={analyzeOffer}
                                        disabled={analysisState === "analyzing"}
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {analysisState === "analyzing"
                                            ? "Analyzing offer..."
                                            : "Check this offer"}

                                        {analysisState !== "analyzing" && (
                                            <ArrowRight className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Privacy */}
                            <div className="mt-6 flex gap-3 rounded-xl bg-muted/50 p-4">
                                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                                <p className="text-xs leading-5 text-muted-foreground">
                                    Your uploaded document is private. It will not be
                                    displayed publicly on a company profile. Never upload
                                    documents containing information you do not want to
                                    share with the service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo analysis */}
            {analysisState === "complete" && (
                <section className="border-t border-border">
                    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <p className="text-sm font-medium text-primary">
                                    Analysis result
                                </p>

                                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                    Here's what we found
                                </h2>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    This is a demonstration of the future analysis
                                    experience.
                                </p>
                            </div>

                            <div className="hidden items-center gap-2 rounded-full bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning sm:flex">
                                <AlertTriangle className="h-3.5 w-3.5" />
                                Review carefully
                            </div>
                        </div>

                        {/* Demo notice */}
                        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
                            <p className="text-sm font-medium">
                                Demo analysis
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                These results are sample data for the interface. The
                                actual document analysis system has not been connected
                                yet.
                            </p>
                        </div>

                        {/* Summary */}
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <ResultItem
                                label="Company"
                                value="Example Technologies"
                                icon={<CheckCircle2 />}
                            />

                            <ResultItem
                                label="Role"
                                value="Software Engineer Intern"
                                icon={<CheckCircle2 />}
                            />

                            <ResultItem
                                label="Stipend"
                                value="₹15,000 / month"
                                icon={<CheckCircle2 />}
                            />

                            <ResultItem
                                label="Duration"
                                value="8 weeks"
                                icon={<CheckCircle2 />}
                            />
                        </div>

                        {/* Warning */}
                        <div className="mt-6 rounded-xl border border-warning/30 bg-warning/5 p-6">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/10">
                                    <AlertTriangle className="h-5 w-5 text-warning" />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Information worth verifying
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        The offer contains information that should be
                                        independently verified before you accept it.
                                    </p>

                                    <ul className="mt-4 space-y-3 text-sm">
                                        <li className="flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                                            <span>
                                                Verify that the internship appears on the
                                                company's official website.
                                            </span>
                                        </li>

                                        <li className="flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                                            <span>
                                                Verify the recruiter's email address and
                                                contact information independently.
                                            </span>
                                        </li>

                                        <li className="flex gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                                            <span>
                                                Never assume a stipend mentioned in an offer
                                                is guaranteed until the terms are clear.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* What to do */}
                        <div className="mt-6 rounded-xl border border-border p-6">
                            <h3 className="font-semibold">
                                Before you accept
                            </h3>

                            <div className="mt-5 space-y-4">
                                <ChecklistItem>
                                    Check the company profile on InternSure.
                                </ChecklistItem>

                                <ChecklistItem>
                                    Compare the internship with student experiences.
                                </ChecklistItem>

                                <ChecklistItem>
                                    Contact the company using independently verified
                                    contact information.
                                </ChecklistItem>

                                <ChecklistItem>
                                    Don't pay money simply because an offer letter
                                    looks official.
                                </ChecklistItem>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/companies"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
                            >
                                Check the company
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <button
                                type="button"
                                onClick={removeFile}
                                className="rounded-lg border border-border px-5 py-3 text-sm font-medium hover:bg-muted"
                            >
                                Check another offer
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

function ResultItem({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-success [&_svg]:h-3.5 [&_svg]:w-3.5">
                    {icon}
                </span>

                {label}
            </div>

            <p className="mt-3 text-sm font-medium">
                {value}
            </p>
        </div>
    );
}

function ChecklistItem({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />

            <p className="text-sm leading-6 text-muted-foreground">
                {children}
            </p>
        </div>
    );
}
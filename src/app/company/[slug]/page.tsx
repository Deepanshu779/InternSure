import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    Building2,
    CheckCircle2,
    ExternalLink,
    GraduationCap,
    MapPin,
    ShieldCheck,
    Star,
} from "lucide-react";
import { notFound } from "next/navigation";
import {
    companies,
    studentExperiences,
} from "@/data/companies";

import ExperienceCard from "@/components/ExperienceCard";
import SaveCompanyButton from "@/components/SaveCompanyButton";

interface CompanyPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CompanyPage({
    params,
}: CompanyPageProps) {
    const { slug } = await params;

    const company = companies.find(
        (item) => item.slug === slug
    );

    if (!company) {
        notFound();
    }

    return (
        <main className="min-h-screen">
            {/* Breadcrumb / back */}
            <div className="border-b border-border">
                <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
                    <Link
                        href="/companies"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to companies
                    </Link>
                </div>
            </div>

            {/* Company header */}
            <section className="border-b border-border">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
                        <div className="flex gap-5">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-xl font-semibold">
                                {company.name.charAt(0)}
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                        {company.name}
                                    </h1>

                                    {company.verified && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Verified information
                                        </span>
                                    )}
                                </div>

                                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                    {company.description}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                                    <span className="inline-flex items-center gap-1.5">
                                        <MapPin className="h-4 w-4" />
                                        {company.location}
                                    </span>

                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Official website
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="shrink-0">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                            >
                                Save company
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scores */}
            <section>
                <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                    <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1.5fr]">
                        {/* Trust */}
                        <div className="rounded-xl border border-border p-6">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                Company trust
                            </div>

                            <div className="mt-5 flex items-end gap-2">
                                <span className="text-4xl font-semibold">
                                    {company.trustScore}
                                </span>

                                <span className="mb-1 text-sm text-muted-foreground">
                                    /100
                                </span>
                            </div>

                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${company.trustScore}%`,
                                    }}
                                />
                            </div>

                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                Based on the information currently available to
                                InternSure.
                            </p>
                        </div>

                        {/* Internship quality */}
                        <div className="rounded-xl border border-border p-6">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <GraduationCap className="h-4 w-4 text-primary" />
                                Internship quality
                            </div>

                            <div className="mt-5 flex items-end gap-2">
                                <span className="text-4xl font-semibold">
                                    {company.internshipScore}
                                </span>

                                <span className="mb-1 text-sm text-muted-foreground">
                                    /100
                                </span>
                            </div>

                            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${company.internshipScore}%`,
                                    }}
                                />
                            </div>

                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                A demo score representing the quality of the
                                internship experience.
                            </p>
                        </div>

                        {/* Recommendation */}
                        <div className="rounded-xl border border-border bg-muted/30 p-6">
                            <p className="text-sm font-medium">
                                InternSure recommendation
                            </p>

                            <div className="mt-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                                    <CheckCircle2 className="h-5 w-5 text-success" />
                                </div>

                                <div>
                                    <h2 className="font-semibold">
                                        Recommended
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Demo recommendation
                                    </p>
                                </div>
                            </div>

                            <p className="mt-5 text-sm leading-6 text-muted-foreground">
                                This recommendation will eventually be calculated
                                using verified company information and student
                                experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Verification */}
            <section className="border-t border-border">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium text-primary">
                            Verification
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                            What we know about this company
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Verification results will be based on independently
                            checkable information. A verification badge does not
                            guarantee a particular internship experience.
                        </p>
                    </div>

                    <div className="mt-8 divide-y divide-border rounded-xl border border-border">
                        <VerificationRow
                            icon={<Building2 className="h-5 w-5" />}
                            title="Company information"
                            status="Available"
                            description="Basic company information has been provided."
                        />

                        <VerificationRow
                            icon={<ExternalLink className="h-5 w-5" />}
                            title="Official website"
                            status="Available"
                            description="A website has been associated with this company."
                        />

                        <VerificationRow
                            icon={<ShieldCheck className="h-5 w-5" />}
                            title="Internship information"
                            status="Needs review"
                            description="Internship-specific information requires further verification."
                        />
                    </div>
                </div>
            </section>

            {/* Internship overview */}
            <section className="border-t border-border">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-medium text-primary">
                                Internship experience
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                What students should look at
                            </h2>
                        </div>

                        <Link
                            href="/experiences"
                            className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                        >
                            View experiences
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Metric
                            label="Real-world projects"
                            value="To be verified"
                        />

                        <Metric
                            label="Mentorship"
                            value="To be verified"
                        />

                        <Metric
                            label="Stipend experience"
                            value="To be verified"
                        />

                        <Metric
                            label="Communication"
                            value="To be verified"
                        />
                    </div>
                </div>
            </section>

            {/* Student experiences */}
            <section className="border-t border-border">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-medium text-primary">
                                Student experiences
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                                What students experienced
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                                Experiences help students understand what an internship
                                may actually be like. Verification status is shown clearly
                                for every submission.
                            </p>
                        </div>

                        <Link
                            href="/experiences"
                            className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                        >
                            View all experiences
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-8 space-y-4">
                        {studentExperiences
                            .filter(
                                (experience) => experience.companyId === company.id
                            )
                            .map((experience) => (
                                <ExperienceCard
                                    key={experience.id}
                                    experience={experience}
                                />
                            ))}
                    </div>

                    <div className="mt-6 rounded-xl border border-dashed border-border p-6 text-center">
                        <h3 className="text-sm font-semibold">
                            Did you intern here?
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            Share your experience to help other students make a more
                            informed decision.
                        </p>

                        <button
                            type="button"
                            className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            Share your experience
                        </button>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="border-t border-border">
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                    <p className="text-xs leading-5 text-muted-foreground">
                        InternSure recommendations are informational and based
                        on available evidence. They are not a guarantee of
                        employment, internship quality, payment, or future
                        outcomes.
                    </p>
                </div>
            </section>
        </main>
    );
}

function VerificationRow({
    icon,
    title,
    status,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    status: string;
    description: string;
}) {
    return (
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    {icon}
                </div>

                <div>
                    <h3 className="text-sm font-medium">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>

            <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium">
                {status}
            </span>
        </div>
    );
}

function Metric({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">
                {label}
            </p>

            <div className="mt-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />

                <span className="text-sm font-medium">
                    {value}
                </span>
            </div>
        </div>
    );
}
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
import SaveCompanyButton from "@/components/SaveCompanyButton";
import ExperienceCard from "@/components/ExperienceCard";
import { supabase } from "@/lib/supabase";

interface CompanyPageProps {
    params: Promise<{
        slug: string;
    }>;
}

interface Company {
    id: number;
    name: string;
    slug: string;
    website: string | null;
    location: string | null;
    description: string | null;
    industry: string | null;
    verification_status:
    | "verified"
    | "unverified"
    | "under_review"
    | "needs_attention";
    verification_note: string | null;
}

interface Experience {
    id: number;
    company_name: string;
    role: string;
    duration: string | null;
    internship_year: number | null;
    title: string;
    description: string;
    overall_rating: number | null;
    project_rating: number | null;
    mentorship_rating: number | null;
    communication_rating: number | null;
    stipend_rating: number | null;
    learning_rating: number | null;
    paid_money: boolean | null;
    status: string;
    created_at: string;
}

export default async function CompanyPage({
    params,
}: CompanyPageProps) {
    const { slug } = await params;

    const { data: company, error: companyError } = await supabase
        .from("companies")
        .select("*")
        .eq("slug", slug)
        .single();

    if (companyError || !company) {
        notFound();
    }

    const { data: experiences } = await supabase
        .from("experiences")
        .select("*")
        .eq("company_name", company.name)
        .eq("status", "published")
        .order("created_at", { ascending: false });

    const publishedExperiences = (experiences || []) as Experience[];

    const verificationLabel = getVerificationLabel(
        company.verification_status
    );

    return (
        <main className="min-h-screen">
            {/* Breadcrumb */}
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

                                    {company.verification_status === "verified" && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Verified information
                                        </span>
                                    )}
                                </div>

                                <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                                    {company.description ||
                                        "Company information is currently being reviewed."}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                                    {company.location && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4" />
                                            {company.location}
                                        </span>
                                    )}

                                    {company.industry && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <Building2 className="h-4 w-4" />
                                            {company.industry}
                                        </span>
                                    )}

                                    {company.website && (
                                        <a
                                            href={company.website}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Official website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="shrink-0">
                            <SaveCompanyButton slug={company.slug} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Verification status */}
            <section>
                <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                    <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
                        <div className="rounded-xl border border-border p-6">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                Verification status
                            </div>

                            <div className="mt-5">
                                <span className="inline-flex rounded-full border border-border px-3 py-1.5 text-sm font-medium">
                                    {verificationLabel}
                                </span>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                InternSure uses evidence and available information to
                                determine the current verification status.
                            </p>
                        </div>

                        <div className="rounded-xl border border-border bg-muted/30 p-6">
                            <p className="text-sm font-medium">
                                What this status means
                            </p>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {company.verification_note ||
                                    getVerificationDescription(
                                        company.verification_status
                                    )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Verification details */}
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
                            Verification results are based on independently
                            checkable information. A verification status does not
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
                            status={company.website ? "Available" : "Not provided"}
                            description={
                                company.website
                                    ? "An official website has been associated with this company."
                                    : "No official website has been provided yet."
                            }
                        />

                        <VerificationRow
                            icon={<ShieldCheck className="h-5 w-5" />}
                            title="Verification review"
                            status={verificationLabel}
                            description={
                                company.verification_note ||
                                "Verification information is currently being evaluated."
                            }
                        />
                    </div>
                </div>
            </section>

            {/* Internship overview */}
            <section className="border-t border-border">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div>
                        <p className="text-sm font-medium text-primary">
                            Internship experience
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                            What students should look at
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                            These areas will become evidence-based as verified
                            student experiences and internship information are
                            collected.
                        </p>
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
                                Published experiences can help students understand
                                what an internship may actually be like.
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
                        {publishedExperiences.length > 0 ? (
                            publishedExperiences.map((experience) => (
                                <ExperienceCard
                                    key={experience.id}
                                    experience={{
                                        id: experience.id,
                                        companyId: company.id,
                                        companyName: experience.company_name,
                                        role: experience.role,
                                        duration: experience.duration || "",
                                        year: experience.internship_year || 0,
                                        title: experience.title,
                                        description: experience.description,
                                        overallRating: experience.overall_rating || 0,
                                        projectRating: experience.project_rating || 0,
                                        mentorshipRating:
                                            experience.mentorship_rating || 0,
                                        communicationRating:
                                            experience.communication_rating || 0,
                                        stipendRating:
                                            experience.stipend_rating || 0,
                                        learningRating:
                                            experience.learning_rating || 0,
                                        paidMoney: experience.paid_money || false,
                                        verified: true,
                                        demo: false,
                                    }}
                                />
                            ))
                        ) : (
                            <div className="rounded-xl border border-dashed border-border p-8 text-center">
                                <h3 className="text-sm font-semibold">
                                    No published experiences yet
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                                    Student experiences will appear here after they
                                    have been reviewed and published.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 rounded-xl border border-dashed border-border p-6 text-center">
                        <h3 className="text-sm font-semibold">
                            Did you intern here?
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            Share your experience to help other students make a
                            more informed decision.
                        </p>

                        <Link
                            href="/experiences/share"
                            className="mt-4 inline-flex rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            Share your experience
                        </Link>
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

function getVerificationLabel(
    status: Company["verification_status"]
) {
    switch (status) {
        case "verified":
            return "Verified";

        case "under_review":
            return "Under review";

        case "needs_attention":
            return "Needs attention";

        default:
            return "Unverified";
    }
}

function getVerificationDescription(
    status: Company["verification_status"]
) {
    switch (status) {
        case "verified":
            return "The available company information has passed the current InternSure verification process.";

        case "under_review":
            return "This company is currently being reviewed. Students should check the available information before making a decision.";

        case "needs_attention":
            return "Additional information or verification is needed before InternSure can provide a stronger assessment.";

        default:
            return "InternSure does not currently have enough verified information to assign a stronger verification status.";
    }
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
                    <h3 className="text-sm font-medium">{title}</h3>

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
            <p className="text-sm text-muted-foreground">{label}</p>

            <div className="mt-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />

                <span className="text-sm font-medium">{value}</span>
            </div>
        </div>
    );
}
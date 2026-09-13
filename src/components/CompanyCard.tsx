import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import type { Company } from "@/data/companies";

interface CompanyCardProps {
    company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
    return (
        <Link
            href={`/company/${company.slug}`}
            className="group block rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-sm font-semibold">
                        {company.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                            <h2 className="truncate font-semibold">
                                {company.name}
                            </h2>

                            {company.verified && (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                            )}
                        </div>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {company.location}
                        </div>
                    </div>
                </div>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>

            <p className="mt-5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {company.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/60 p-3">
                    <p className="text-xs text-muted-foreground">
                        Company trust
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                        {company.trustScore}
                        <span className="text-sm font-normal text-muted-foreground">
                            /100
                        </span>
                    </p>
                </div>

                <div className="rounded-lg bg-muted/60 p-3">
                    <p className="text-xs text-muted-foreground">
                        Internship quality
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                        {company.internshipScore}
                        <span className="text-sm font-normal text-muted-foreground">
                            /100
                        </span>
                    </p>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {company.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    );
}
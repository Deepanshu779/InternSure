import {
    BadgeCheck,
    CalendarDays,
    Clock3,
    GraduationCap,
    Star,
} from "lucide-react";
import type { StudentExperience } from "@/data/companies";

interface ExperienceCardProps {
    experience: StudentExperience;
}

export default function ExperienceCard({
    experience,
}: ExperienceCardProps) {
    return (
        <article className="rounded-xl border border-border bg-background p-6">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">
                            {experience.title}
                        </h3>

                        {experience.demo && (
                            <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                Demo
                            </span>
                        )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5" />
                            {experience.role}
                        </span>

                        <span className="flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5" />
                            {experience.duration}
                        </span>

                        <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {experience.year}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current" />

                    <span className="text-sm font-semibold">
                        {experience.rating.toFixed(1)}
                    </span>

                    <span className="text-xs text-muted-foreground">
                        / 5
                    </span>
                </div>
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
                {experience.description}
            </p>

            {/* Ratings */}
            <div className="mt-6 grid gap-3 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
                <Rating
                    label="Real-world projects"
                    value={experience.projectRating}
                />

                <Rating
                    label="Mentorship"
                    value={experience.mentorshipRating}
                />

                <Rating
                    label="Stipend"
                    value={experience.stipendRating}
                />

                <Rating
                    label="Communication"
                    value={experience.communicationRating}
                />
            </div>

            {/* Verification */}
            <div className="mt-5 flex items-center gap-2 text-xs">
                {experience.verified ? (
                    <>
                        <BadgeCheck className="h-4 w-4 text-success" />
                        <span className="text-success">
                            Verified experience
                        </span>
                    </>
                ) : (
                    <span className="text-muted-foreground">
                        Experience verification pending
                    </span>
                )}
            </div>
        </article>
    );
}

function Rating({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div>
            <p className="text-xs text-muted-foreground">
                {label}
            </p>

            <div className="mt-2 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-current" />

                <span className="text-sm font-medium">
                    {value.toFixed(1)}
                </span>
            </div>
        </div>
    );
}
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="flex flex-col justify-between gap-10 md:flex-row">

                    <div className="max-w-sm">
                        <Link
                            href="/"
                            className="text-lg font-semibold tracking-tight"
                        >
                            InternSure
                        </Link>

                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Helping students verify companies, understand internships,
                            and make better career decisions.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
                        <div>
                            <h3 className="text-sm font-semibold">
                                Platform
                            </h3>

                            <div className="mt-4 space-y-3">
                                <Link
                                    href="/companies"
                                    className="block text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Companies
                                </Link>

                                <Link
                                    href="/internships"
                                    className="block text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Internships
                                </Link>

                                <Link
                                    href="/check-offer"
                                    className="block text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Check an Offer
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold">
                                Community
                            </h3>

                            <div className="mt-4 space-y-3">
                                <Link
                                    href="/experiences"
                                    className="block text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Experiences
                                </Link>

                                <Link
                                    href="/report"
                                    className="block text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Report an Issue
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold">
                                Legal
                            </h3>

                            <div className="mt-4 space-y-3">
                                <Link
                                    href="/privacy"
                                    className="block text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Privacy
                                </Link>

                                <Link
                                    href="/terms"
                                    className="block text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Terms
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-border pt-6">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} InternSure. Built for students.
                    </p>
                </div>
            </div>
        </footer>
    );
}
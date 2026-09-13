import Link from "next/link";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center"
                    aria-label="InternSure home"
                >
                    <img
                        src="/images/internsure-logo.png"
                        alt="InternSure"
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                {/* Desktop navigation */}
                <nav className="hidden items-center gap-7 md:flex">
                    <Link
                        href="/companies"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Companies
                    </Link>

                    <Link
                        href="/internships"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Internships
                    </Link>

                    <Link
                        href="/check-offer"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Check an Offer
                    </Link>

                    <Link
                        href="/experiences"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Experiences
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Search"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
                    >
                        <Search className="h-4 w-4" />
                    </button>

                    <ThemeToggle />

                    <Link
                        href="/login"
                        className="hidden rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted sm:block"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </header>
    );
}
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
    title: {
        default: "InternSure — Know the company before you join",
        template: "%s | InternSure",
    },
    description:
        "Verify companies, compare internships, and learn from real student experiences before you join.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <Navbar />

                    <main>{children}</main>

                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
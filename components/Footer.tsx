"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-black py-12 px-4 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand and Description */}
                    <div className="md:col-span-2">
                        <Link
                            href="/"
                            className="text-2xl font-extrabold tracking-tight text-white no-underline"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Place<span className="text-white/60">Index</span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm text-white/40 leading-relaxed">
                            A research initiative exploring standardized benchmark systems for real estate. Compare localities side-by-side using objective, data-driven signals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Project</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">Framework</Link></li>
                            <li><Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">Data Strategy</Link></li>
                            <li><Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">Scoring Models</Link></li>
                        </ul>
                    </div>

                    {/* SEO Rich Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="mailto:ameysawant@placeindex.online" className="text-sm text-white/40 hover:text-white transition-colors no-underline">ameysawant@placeindex.online</a></li>
                            <li><Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">LinkedIn</Link></li>
                            <li><Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">Twitter</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/20">
                        &copy; {new Date().getFullYear()} PlaceIndex Research Initiative.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/" className="text-xs text-white/20 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/" className="text-xs text-white/20 hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

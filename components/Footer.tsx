"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-black py-12 px-4 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link
                            href="/"
                            className="text-2xl font-extrabold tracking-tight text-white no-underline hover:opacity-70 transition-opacity duration-200"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Place<span className="text-white/50">Index</span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm text-white/30 leading-relaxed">
                            A research initiative exploring standardized benchmark systems for real estate.
                            Compare localities side-by-side using objective, data-driven signals.
                        </p>

                        {/* Index badge */}
                        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.03]">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                            <span className="text-[11px] text-white/30 font-mono">Building the NIFTY for Neighborhoods</span>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:contact@placeindex.online"
                                    className="text-sm text-white/35 hover:text-white transition-colors duration-200 no-underline flex items-center gap-2 group"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-80 transition-opacity" aria-hidden="true">
                                        <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    contact@placeindex.online
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://x.com/placeindex"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-white/35 hover:text-white transition-colors duration-200 no-underline flex items-center gap-2 group"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-80 transition-opacity" aria-hidden="true">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    X (Twitter)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com/company/placeindex"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-white/35 hover:text-white transition-colors duration-200 no-underline flex items-center gap-2 group"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-80 transition-opacity" aria-hidden="true">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 reveal">
                    <p className="text-xs text-white/20">
                        &copy; {new Date().getFullYear()} PlaceIndex Research Initiative.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/" className="text-xs text-white/20 hover:text-white/60 transition-colors duration-200">Privacy Policy</Link>
                        <Link href="/" className="text-xs text-white/20 hover:text-white/60 transition-colors duration-200">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

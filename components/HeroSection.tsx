"use client";

import { useState } from "react";
import WaitlistModal from "./WaitlistModal";
import DashboardPreview from "./DashboardPreview";

export default function HeroSection() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-20">
                {/* Background radial glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.06) 0%, transparent 70%)",
                    }}
                />

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    aria-hidden="true"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-6 animate-fadeInUp">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                        <span className="text-xs text-white/50 font-mono tracking-wider">WAITLIST OPEN — EARLY ACCESS</span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[1.05] animate-fadeInUp mb-6"
                        style={{ fontFamily: "var(--font-syne)", animationDelay: "0.1s" }}
                    >
                        The{" "}
                        <span className="gradient-text">S&P 500</span>
                        <br />
                        for Neighborhoods.
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="max-w-2xl mx-auto text-base sm:text-lg text-white/50 leading-relaxed animate-fadeInUp mb-10"
                        style={{ animationDelay: "0.2s" }}
                    >
                        PlaceIndex converts fragmented real estate data into structured, time-series
                        investment signals — so you can compare localities like financial assets, not listings.
                    </p>

                    {/* CTA */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fadeInUp"
                        style={{ animationDelay: "0.3s" }}
                    >
                        <button
                            onClick={() => setModalOpen(true)}
                            className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] border-none cursor-pointer"
                        >
                            Join the Waitlist
                        </button>
                        <a
                            href="#how-it-works"
                            className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
                        >
                            See how it works
                        </a>
                    </div>

                    {/* Social proof */}
                    <p
                        className="mt-8 text-xs text-white/25 animate-fadeInUp"
                        style={{ animationDelay: "0.4s" }}
                    >
                        Investors, developers & analysts from India on the waitlist
                    </p>

                    {/* Dashboard Preview */}
                    <div
                        className="mt-16 animate-fadeInUp"
                        style={{ animationDelay: "0.5s" }}
                    >
                        <DashboardPreview />
                    </div>
                </div>
            </section>

            <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

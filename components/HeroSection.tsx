"use client";

import { useState } from "react";
import WaitlistModal from "./WaitlistModal";
import DashboardPreview from "./DashboardPreview";

export default function HeroSection() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-20">

                {/* Spinning decorative ring — secondary action */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03] spin-slow pointer-events-none"
                    aria-hidden="true"
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.03] pointer-events-none"
                    style={{ animation: "spinSlow 30s linear infinite reverse" }}
                    aria-hidden="true"
                />

                {/* Background radial glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.07) 0%, transparent 70%)",
                    }}
                />

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025]"
                    aria-hidden="true"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 w-full max-w-5xl mx-auto text-center">

                    {/* Badge — anticipation: first thing to appear */}
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-6 animate-fadeIn"
                        style={{ animationDelay: "0ms", animationDuration: "0.5s" }}
                    >
                        <span className="pulse-ring w-1.5 h-1.5 rounded-full bg-white/70 inline-block relative" />
                        <span className="text-xs text-white/50 font-mono tracking-wider">WAITLIST OPEN — EARLY ACCESS</span>
                    </div>

                    {/* Headline — staggered words */}
                    <h1
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[1.05] mb-6 animate-fadeUp"
                        style={{ fontFamily: "var(--font-syne)", animationDelay: "100ms" }}
                    >
                        The{" "}
                        <span className="gradient-text">S&P 500</span>
                        <br />
                        for Neighborhoods.
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="max-w-2xl mx-auto text-base sm:text-lg text-white/50 leading-relaxed mb-10 animate-fadeUp"
                        style={{ animationDelay: "220ms" }}
                    >
                        PlaceIndex converts fragmented real estate data into structured, time-series
                        investment signals — so you can compare localities like financial assets, not listings.
                    </p>

                    {/* CTA row — follow-through: buttons arrive after text */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fadeUp"
                        style={{ animationDelay: "340ms" }}
                    >
                        <button
                            onClick={() => setModalOpen(true)}
                            className="group relative rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black border-none cursor-pointer overflow-hidden"
                            style={{ transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease" }}
                            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                            onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
                            onMouseUp={e => (e.currentTarget.style.transform = "scale(1.04)")}
                        >
                            {/* Shimmer sweep on hover */}
                            <span
                                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                style={{ transition: "transform 0.5s ease" }}
                                aria-hidden="true"
                            />
                            <span className="relative">Join the Waitlist</span>
                        </button>
                        <a
                            href="#how-it-works"
                            className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all no-underline"
                            style={{ transition: "all 0.25s ease" }}
                        >
                            See how it works ↓
                        </a>
                    </div>

                    {/* Social proof */}
                    <p
                        className="mt-8 text-xs text-white/25 animate-fadeIn"
                        style={{ animationDelay: "500ms" }}
                    >
                        Investors, developers & analysts from India on the waitlist
                    </p>

                    {/* Dashboard — floats gently, arrives last (staging principle) */}
                    <div
                        className="mt-16 animate-fadeUp animate-float"
                        style={{ animationDelay: "500ms", animationFillMode: "both" }}
                    >
                        <DashboardPreview />
                    </div>
                </div>
            </section>

            <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

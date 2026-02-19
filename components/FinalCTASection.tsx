"use client";

import { useState } from "react";
import WaitlistModal from "./WaitlistModal";

const stats = [
    { label: "Data Signals", value: "7+" },
    { label: "Scoring Layers", value: "4" },
    { label: "Target Cities", value: "India" },
    { label: "Status", value: "Beta Soon" },
];

export default function FinalCTASection() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <section className="relative py-32 px-4 sm:px-8 lg:px-16 border-t border-white/5 overflow-hidden">
                {/* Bottom radial glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(255,255,255,0.06) 0%, transparent 70%)",
                    }}
                />

                {/* Spinning ring decoration — secondary action */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.04] spin-slow pointer-events-none"
                    aria-hidden="true"
                />

                <div className="relative max-w-3xl mx-auto text-center">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-6 reveal">
                        The Waitlist is Open
                    </p>

                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 reveal"
                        style={{ fontFamily: "var(--font-syne)", transitionDelay: "80ms" }}
                    >
                        Get early access to the
                        <br />
                        <span className="shimmer-text">NIFTY for Neighborhoods.</span>
                    </h2>

                    <p
                        className="text-sm sm:text-base text-white/40 leading-relaxed mb-10 max-w-xl mx-auto reveal"
                        style={{ transitionDelay: "160ms" }}
                    >
                        Be first to receive our neighborhood scoring dashboard, weekly market
                        intelligence reports, and exclusive beta credentials.
                    </p>

                    {/* CTA button — squash/stretch on click */}
                    <div className="reveal" style={{ transitionDelay: "240ms" }}>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="relative rounded-full bg-white px-10 py-4 text-sm font-bold text-black border-none cursor-pointer overflow-hidden group"
                            style={{ transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)" }}
                            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                            onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95)")}
                            onMouseUp={e => (e.currentTarget.style.transform = "scale(1.05)")}
                        >
                            {/* Shimmer sweep */}
                            <span
                                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none"
                                style={{ transition: "transform 0.5s ease" }}
                                aria-hidden="true"
                            />
                            <span className="relative">Join the Waitlist</span>
                        </button>
                    </div>

                    {/* Stats row */}
                    <div
                        className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/5 pt-10 stagger-children"
                    >
                        {stats.map((m, i) => (
                            <div
                                key={m.label}
                                className="text-center reveal"
                                style={{ transitionDelay: `${320 + i * 80}ms` }}
                            >
                                <p className="text-2xl sm:text-3xl font-black text-white font-mono">{m.value}</p>
                                <p className="text-xs text-white/25 mt-1 font-mono uppercase tracking-wider">{m.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

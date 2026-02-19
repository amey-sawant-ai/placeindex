"use client";

import { useState } from "react";
import WaitlistModal from "./WaitlistModal";

export default function FinalCTASection() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <section className="relative py-32 px-4 sm:px-8 lg:px-16 border-t border-white/5 overflow-hidden">
                {/* Background glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                    style={{
                        background:
                            "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                />

                <div className="relative max-w-3xl mx-auto text-center">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-6">
                        The Waitlist is Open
                    </p>

                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Get early access to the
                        <br />
                        <span className="text-white/40">NIFTY for Neighborhoods.</span>
                    </h2>

                    <p className="text-sm sm:text-base text-white/40 leading-relaxed mb-10 max-w-xl mx-auto">
                        Be first to receive our neighborhood scoring dashboard, weekly market
                        intelligence reports, and exclusive beta credentials.
                    </p>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="rounded-full bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] border-none cursor-pointer"
                    >
                        Join the Waitlist
                    </button>

                    {/* Meta */}
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-white/5 pt-10">
                        {[
                            { label: "Data Signals", value: "7+" },
                            { label: "Scoring Layers", value: "4" },
                            { label: "Target Cities", value: "India" },
                            { label: "Status", value: "Beta Soon" },
                        ].map((m) => (
                            <div key={m.label} className="text-center">
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

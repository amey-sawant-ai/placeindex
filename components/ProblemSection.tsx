"use client";

const comparisons = [
    {
        before: "\"Bro, my broker said this area will go up.\"",
        after: "Locality has 0.78 strength score with 12% YoY rental-adjusted appreciation and low volatility vs peer zones.",
    },
    {
        before: "\"This flat is Rs 8,500/sqft near a metro.\"",
        after: "Metro proximity +0.12 to liquidity score. Infrastructure impact model: 18-month lag detected.",
    },
    {
        before: "\"3 builders launched here so it must be good.\"",
        after: "Inventory absorption rate: 68%. Supply overhang risk flagged. Demand velocity declining QoQ.",
    },
];

const problems = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Opaque",
        desc: "Property data in India is scattered across registries, brokers, and classified sites with no standard format.",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Incomparable",
        desc: "Powai vs Baner vs Whitefield — no standardized benchmark makes cross-city comparison near-impossible.",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Emotion-Driven",
        desc: "Investment decisions rely on broker opinion, word-of-mouth, and media hype — not structured signals.",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Illiquid & Delayed",
        desc: "Infrastructure impact on prices is delayed by 12–24 months. No system captures or models this lag.",
    },
];

export default function ProblemSection() {
    return (
        <section className="relative py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-4">The Problem</p>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Real estate is running on{" "}
                        <span className="text-white/40">vibes, not data.</span>
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/40 leading-relaxed">
                        Stocks have Bloomberg. Crypto has on-chain. Real estate has… a broker on WhatsApp.
                    </p>
                </div>

                {/* Problem cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                    {problems.map((p) => (
                        <div
                            key={p.title}
                            className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200 group cursor-default"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4 group-hover:text-white/60 transition-colors">
                                {p.icon}
                            </div>
                            <h3 className="text-sm font-bold text-white mb-2">{p.title}</h3>
                            <p className="text-xs text-white/40 leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Before / After */}
                <div className="space-y-4">
                    <p className="text-xs text-white/25 uppercase tracking-widest font-mono text-center mb-8">PlaceIndex changes this</p>
                    {comparisons.map((c, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                        >
                            {/* Before */}
                            <div className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-white/15 flex items-center justify-center">
                                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                                        <path d="M2 2l8 8M10 2L2 10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <p className="text-sm text-white/30 italic leading-relaxed">{c.before}</p>
                            </div>
                            {/* After */}
                            <div className="flex items-start gap-3 p-4 rounded-xl border border-white/15 bg-white/[0.03]">
                                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                                        <path d="M2 6l3 3 5-5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <p className="text-sm text-white/70 leading-relaxed font-mono text-xs">{c.after}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

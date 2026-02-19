"use client";

const steps = [
    {
        num: "01",
        title: "Data Ingestion",
        desc: "We collect transaction records, rental listings, infrastructure announcements, and socioeconomic signals for every locality — across sources, continuously.",
        tags: ["Transaction Prices", "Rental Yields", "Infrastructure Signals", "Demand Velocity"],
    },
    {
        num: "02",
        title: "Normalization & Modeling",
        desc: "Raw data is cleaned, hedonic-adjusted for property differences, smoothed via index algorithms, and normalized into a comparable format across all localities.",
        tags: ["Hedonic Pricing", "Index Smoothing", "Signal Normalization", "Outlier Removal"],
    },
    {
        num: "03",
        title: "Composite Score Generation",
        desc: "Weighted signals are combined into a single locality investment score — updated over time as a true time-series, not a static snapshot.",
        tags: ["Composite Scoring", "Time-Series Index", "Momentum Detection", "ML Trend Layer"],
    },
    {
        num: "04",
        title: "Intelligence Output",
        desc: "Every locality gets a stock-style performance dashboard: score history, volatility bands, momentum signals, risk classification, and liquidity strength.",
        tags: ["Area Score", "Volatility Band", "Risk Class", "Liquidity Rating"],
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="relative py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
            {/* Animated vertical connector line */}
            <div
                className="absolute left-1/2 top-40 bottom-40 w-px hidden lg:block reveal"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)" }}
                aria-hidden="true"
            />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20 reveal">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-4">How It Works</p>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        A data pipeline for{" "}
                        <span className="text-white/40">physical space.</span>
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/40 leading-relaxed">
                        Four stages convert chaotic property data into structured investment intelligence.
                        This is not a CRUD app — it&apos;s a data science product.
                    </p>
                </div>

                {/* Steps — alternate left/right slide */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
                    {steps.map((step, i) => (
                        <div
                            key={step.num}
                            className={`${i % 2 === 0 ? "reveal-left" : "reveal"} relative p-6 sm:p-8 rounded-2xl border border-white/8 bg-white/[0.02] hover-glow group cursor-default`}
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            {/* Step number — large ghost */}
                            <div className="flex items-start justify-between mb-5">
                                <span
                                    className="text-5xl font-black text-white/[0.05] font-mono leading-none select-none group-hover:text-white/[0.09] transition-all duration-500"
                                >
                                    {step.num}
                                </span>
                                {/* Dot connector */}
                                <div className="w-2 h-2 rounded-full bg-white/15 mt-2 group-hover:bg-white/50 group-hover:scale-125 transition-all duration-300" />
                            </div>

                            <h3
                                className="text-lg sm:text-xl font-bold text-white mb-3"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                {step.title}
                            </h3>
                            <p className="text-sm text-white/40 leading-relaxed mb-5">
                                {step.desc}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {step.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="tag-pill text-[11px] px-3 py-1 rounded-full border border-white/8 text-white/30 font-mono cursor-default"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Equation */}
                <div className="mt-12 p-6 rounded-2xl border border-white/8 bg-white/[0.01] text-center reveal hover-glow">
                    <p className="text-xs text-white/25 uppercase tracking-widest font-mono mb-3">The Stack</p>
                    <p className="text-sm sm:text-base text-white/40 font-mono">
                        Bloomberg Terminal
                        <span className="text-white/15 mx-3">×</span>
                        Zillow
                        <span className="text-white/15 mx-3">×</span>
                        NSE
                        <span className="text-white/15 mx-3">×</span>
                        Urban Planning Data
                    </p>
                    <p className="mt-2 text-xs text-white/20">Focused on Indian localities.</p>
                </div>
            </div>
        </section>
    );
}

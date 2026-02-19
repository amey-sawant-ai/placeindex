"use client";

const signals = [
    {
        label: "Investment Score",
        value: "0.82",
        sub: "Composite strength",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
                <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Rental Yield",
        value: "4.7%",
        sub: "Gross annual",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
                <path d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Momentum",
        value: "+12.4%",
        sub: "YoY price velocity",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
                <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Volatility",
        value: "Low",
        sub: "vs peer zones",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
                <path d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Liquidity",
        value: "High",
        sub: "Capital flow index",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
                <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "Absorption Rate",
        value: "74%",
        sub: "Inventory consumed",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
                <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

const useCases = [
    { icon: "📐", label: "Investors", desc: "Find undervalued zones before media hype." },
    { icon: "🏗️", label: "Developers", desc: "Identify demand hotspots before they peak." },
    { icon: "🏦", label: "Banks & NBFCs", desc: "Underwriting signal for loan risk models." },
    { icon: "📱", label: "Fintechs", desc: "API integration for property-linked products." },
    { icon: "📊", label: "ETF Managers", desc: "Backbone index for geography-weighted funds." },
    { icon: "🏛️", label: "Urban Planners", desc: "Predictive migration & development intelligence." },
];

export default function SignalsSection() {
    return (
        <section className="relative py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 reveal">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-4">Output Signals</p>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Every locality gets{" "}
                        <span className="text-white/40">six intelligence layers.</span>
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/40 leading-relaxed">
                        Not just a price chart — a behavior chart. Updated continuously as market conditions evolve.
                    </p>
                </div>

                {/* Signals grid — staggered scale-in */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-24 stagger-children">
                    {signals.map((s) => (
                        <div
                            key={s.label}
                            className="reveal-scale p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover-glow group cursor-default"
                        >
                            <div className="flex items-center gap-2 mb-3 text-white/30 group-hover:text-white/60 transition-colors duration-300">
                                {s.icon}
                                <span className="text-xs font-mono">{s.label}</span>
                            </div>
                            <p
                                className="text-2xl sm:text-3xl font-black text-white font-mono mb-1 group-hover:scale-105 origin-left transition-transform duration-300"
                            >
                                {s.value}
                            </p>
                            <p className="text-xs text-white/25">{s.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Use-case header */}
                <div className="text-center mb-12 reveal">
                    <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-4">Who It&apos;s For</p>
                    <h2
                        className="text-3xl sm:text-4xl font-extrabold text-white"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Built for the entire{" "}
                        <span className="text-white/40">real estate stack.</span>
                    </h2>
                </div>

                {/* Use-case cards — staggered reveal */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 stagger-children">
                    {useCases.map((u, i) => (
                        <div
                            key={u.label}
                            className="reveal flex items-start gap-3 p-4 sm:p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover-glow cursor-default group"
                            style={{ transitionDelay: `${i * 60}ms` }}
                        >
                            <span
                                className="text-xl shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-300 origin-center"
                                aria-hidden="true"
                            >
                                {u.icon}
                            </span>
                            <div>
                                <p className="text-sm font-bold text-white mb-1">{u.label}</p>
                                <p className="text-xs text-white/35 leading-relaxed">{u.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

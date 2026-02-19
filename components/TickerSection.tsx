"use client";

const tickers = [
    { name: "Powai, MUM", score: "0.82", change: "+8.4%" },
    { name: "Whitefield, BLR", score: "0.76", change: "+6.1%" },
    { name: "Baner, PNE", score: "0.69", change: "+4.7%" },
    { name: "Koramangala, BLR", score: "0.74", change: "+5.3%" },
    { name: "Andheri W, MUM", score: "0.67", change: "+3.8%" },
    { name: "Dwarka, DEL", score: "0.54", change: "-1.2%" },
    { name: "Gurgaon S-City", score: "0.71", change: "+2.9%" },
    { name: "Hinjewadi, PNE", score: "0.65", change: "+5.6%" },
    { name: "OMR, CHN", score: "0.60", change: "+3.1%" },
    { name: "Newtown, KOL", score: "0.55", change: "+1.8%" },
];

// Duplicate for seamless loop
const allTickers = [...tickers, ...tickers];

export default function TickerSection() {
    return (
        <section className="relative border-t border-b border-white/5 py-4 overflow-hidden" aria-label="Live locality index ticker">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
                aria-hidden="true"
            />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
                aria-hidden="true"
            />

            <div className="ticker-track flex items-center gap-8 whitespace-nowrap" aria-hidden="true">
                {allTickers.map((t, i) => (
                    <div key={i} className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-white/25 font-mono">{t.name}</span>
                        <span className="text-xs text-white/60 font-mono font-bold">{t.score}</span>
                        <span className={`text-xs font-mono ${t.change.startsWith("+") ? "text-white/50" : "text-white/25"}`}>
                            {t.change}
                        </span>
                        <span className="text-white/10 text-xs">·</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

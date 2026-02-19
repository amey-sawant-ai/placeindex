"use client";

import { useEffect, useRef } from "react";

// Animated SVG sparkline chart — fake but realistic-looking area chart
function SparkChart() {
    const points = [
        "0,60", "40,52", "80,58", "120,40", "160,44", "200,28",
        "240,32", "280,18", "320,22", "360,10", "400,15", "440,5",
    ];
    const areaPoints = [...points, "440,80", "0,80"].join(" ");
    const linePoints = points.join(" ");

    return (
        <svg viewBox="0 0 440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
            </defs>
            <polygon points={areaPoints} fill="url(#chartGradient)" />
            <polyline points={linePoints} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Latest dot */}
            <circle cx="440" cy="5" r="3" fill="white" />
            <circle cx="440" cy="5" r="6" fill="rgba(255,255,255,0.2)" />
        </svg>
    );
}

function VolatilityBar({ pct, color }: { pct: number; color: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${pct}%`, background: color }}
                />
            </div>
            <span className="text-xs text-white/40 w-8 text-right">{pct}%</span>
        </div>
    );
}

const localities = [
    {
        name: "Powai, Mumbai",
        score: 0.82,
        change: "+8.4%",
        positive: true,
        tag: "High Momentum",
        tagColor: "rgba(255,255,255,0.15)",
        vol: 34,
    },
    {
        name: "Whitefield, Bangalore",
        score: 0.76,
        change: "+6.1%",
        positive: true,
        tag: "Stable Growth",
        tagColor: "rgba(255,255,255,0.10)",
        vol: 22,
    },
    {
        name: "Baner, Pune",
        score: 0.69,
        change: "+4.7%",
        positive: true,
        tag: "Emerging",
        tagColor: "rgba(255,255,255,0.08)",
        vol: 18,
    },
    {
        name: "Dwarka, Delhi",
        score: 0.54,
        change: "-1.2%",
        positive: false,
        tag: "Consolidating",
        tagColor: "rgba(255,255,255,0.05)",
        vol: 48,
    },
];

export default function DashboardPreview() {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        const handleMouse = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
            card.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg)`;
        };
        const handleLeave = () => {
            card.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg)";
        };
        card.addEventListener("mousemove", handleMouse);
        card.addEventListener("mouseleave", handleLeave);
        return () => {
            card.removeEventListener("mousemove", handleMouse);
            card.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden glow-white"
            style={{ transition: "transform 0.15s ease-out" }}
            aria-label="PlaceIndex dashboard preview"
        >
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/15" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <span className="ml-3 text-xs text-white/30 font-mono">placeindex.online / dashboard</span>
                <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                    <span className="text-xs text-white/30 font-mono">LIVE</span>
                </div>
            </div>

            {/* Header row */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest font-mono">Area Investment Index</p>
                    <p className="text-lg font-bold text-white mt-0.5" style={{ fontFamily: "var(--font-syne)" }}>India — Q1 2025</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-white/30">Index Value</p>
                    <p className="text-2xl font-bold text-white font-mono">741.6</p>
                    <p className="text-xs text-white/40 font-mono">+2.4% WTD</p>
                </div>
            </div>

            {/* Sparkline */}
            <div className="px-5 pt-4 pb-2 h-20">
                <SparkChart />
            </div>

            {/* Locality rows */}
            <div className="px-5 pb-5 space-y-3 mt-2">
                {localities.map((loc) => (
                    <div
                        key={loc.name}
                        className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer"
                    >
                        {/* Score ring */}
                        <div className="shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-white font-mono">{loc.score}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-white truncate">{loc.name}</span>
                                <span
                                    className="text-[10px] px-2 py-0.5 rounded-full text-white/50 border border-white/10 shrink-0"
                                    style={{ background: loc.tagColor }}
                                >
                                    {loc.tag}
                                </span>
                            </div>
                            <VolatilityBar pct={loc.vol} color="rgba(255,255,255,0.5)" />
                        </div>

                        <div className="shrink-0 text-right">
                            <span className={`text-sm font-mono font-bold ${loc.positive ? "text-white" : "text-white/40"}`}>
                                {loc.change}
                            </span>
                            <p className="text-[10px] text-white/30">YoY</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

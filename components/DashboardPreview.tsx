"use client";

import { useEffect, useRef, useState } from "react";

// Animated SVG sparkline — draws itself on mount
function SparkChart({ animate }: { animate: boolean }) {
    const points = [
        [0, 60], [40, 52], [80, 58], [120, 40], [160, 44], [200, 28],
        [240, 32], [280, 18], [320, 22], [360, 10], [400, 15], [440, 5],
    ];
    const linePoints = points.map(([x, y]) => `${x},${y}`).join(" ");
    const areaPoints = [...points.map(([x, y]) => `${x},${y}`), "440,80", "0,80"].join(" ");

    return (
        <svg viewBox="0 0 440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
            </defs>
            {/* Area fill — fades in */}
            <polygon
                points={areaPoints}
                fill="url(#chartGradient)"
                style={{
                    opacity: animate ? 1 : 0,
                    transition: "opacity 1.2s ease 0.8s",
                }}
            />
            {/* Line — draws itself */}
            <polyline
                points={linePoints}
                fill="none"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                className={`chart-line ${animate ? "drawn" : ""}`}
                style={{ strokeDasharray: 1000, strokeDashoffset: animate ? 0 : 1000, transition: "stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1) 0.3s" }}
            />
            {/* Latest dot pulses */}
            <circle cx="440" cy="5" r="3" fill="white" style={{ opacity: animate ? 1 : 0, transition: "opacity 0.4s ease 2s" }} />
            <circle cx="440" cy="5" r="6" fill="rgba(255,255,255,0.15)"
                style={{
                    opacity: animate ? 1 : 0,
                    transition: "opacity 0.4s ease 2s",
                    animation: animate ? "pulseRing 2s ease-out 2s infinite" : "none",
                }}
            />
        </svg>
    );
}

function AnimatedBar({ pct, animate }: { pct: number; animate: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                    className="h-full rounded-full bg-white/50"
                    style={{
                        width: animate ? `${pct}%` : "0%",
                        transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${500 + pct * 5}ms`,
                    }}
                />
            </div>
            <span className="text-xs text-white/40 w-8 text-right">{pct}%</span>
        </div>
    );
}

const localities = [
    { name: "Powai, Mumbai", score: "0.82", change: "+8.4%", positive: true, tag: "High Momentum", vol: 34 },
    { name: "Whitefield, Blr", score: "0.76", change: "+6.1%", positive: true, tag: "Stable Growth", vol: 22 },
    { name: "Baner, Pune", score: "0.69", change: "+4.7%", positive: true, tag: "Emerging", vol: 18 },
    { name: "Dwarka, Delhi", score: "0.54", change: "-1.2%", positive: false, tag: "Consolidating", vol: 48 },
];

export default function DashboardPreview() {
    const cardRef = useRef<HTMLDivElement>(null);
    const [chartVisible, setChartVisible] = useState(false);
    const [rowsVisible, setRowsVisible] = useState(false);

    // 3D tilt on mouse move
    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        const handleMouse = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
            card.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale(1.01)`;
        };
        const handleLeave = () => {
            card.style.transform = "perspective(1200px) rotateY(0) rotateX(0) scale(1)";
        };
        card.addEventListener("mousemove", handleMouse);
        card.addEventListener("mouseleave", handleLeave);
        return () => { card.removeEventListener("mousemove", handleMouse); card.removeEventListener("mouseleave", handleLeave); };
    }, []);

    // Trigger chart draw on intersection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setChartVisible(true), 200);
                    setTimeout(() => setRowsVisible(true), 400);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden glow-white"
            style={{ transition: "transform 0.15s cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}
            aria-label="PlaceIndex dashboard preview"
        >
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-red-400/70 transition-colors cursor-default" />
                <div className="w-3 h-3 rounded-full bg-white/15 hover:bg-yellow-400/70 transition-colors cursor-default" />
                <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-green-400/70 transition-colors cursor-default" />
                <span className="ml-3 text-xs text-white/30 font-mono">placeindex.online / dashboard</span>
                <div className="ml-auto flex items-center gap-1.5">
                    <span className="pulse-ring w-1.5 h-1.5 rounded-full bg-white/60 inline-block relative" />
                    <span className="text-xs text-white/30 font-mono">LIVE</span>
                </div>
            </div>

            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest font-mono">Area Investment Index</p>
                    <p className="text-lg font-bold text-white mt-0.5" style={{ fontFamily: "var(--font-syne)" }}>India — Q1 2025</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-white/30">Index Value</p>
                    <p
                        className="text-2xl font-bold text-white font-mono"
                        style={{ animation: chartVisible ? "scorePop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.5s both" : "none" }}
                    >
                        741.6
                    </p>
                    <p className="text-xs text-white/40 font-mono">+2.4% WTD</p>
                </div>
            </div>

            {/* Sparkline */}
            <div className="px-5 pt-4 pb-2 h-20">
                <SparkChart animate={chartVisible} />
            </div>

            {/* Locality rows — stagger in */}
            <div className="px-5 pb-5 space-y-3 mt-2">
                {localities.map((loc, i) => (
                    <div
                        key={loc.name}
                        className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 cursor-pointer"
                        style={{
                            opacity: rowsVisible ? 1 : 0,
                            transform: rowsVisible ? "translateX(0)" : "translateX(-12px)",
                            transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                        }}
                    >
                        {/* Score ring */}
                        <div className="shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors">
                            <span className="text-xs font-bold text-white font-mono">{loc.score}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-white truncate">{loc.name}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full text-white/40 border border-white/8 bg-white/[0.03] shrink-0">
                                    {loc.tag}
                                </span>
                            </div>
                            <AnimatedBar pct={loc.vol} animate={rowsVisible} />
                        </div>

                        <div className="shrink-0 text-right">
                            <span className={`text-sm font-mono font-bold ${loc.positive ? "text-white" : "text-white/35"}`}>
                                {loc.change}
                            </span>
                            <p className="text-[10px] text-white/25">YoY</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

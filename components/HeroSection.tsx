export default function HeroSection() {
    return (
        <section className="relative w-full h-screen overflow-hidden">

            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/hero-section/bg-video/bg-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                title="Background cinematic video showing various places"
            />

            {/* Dark overlay so content stays readable */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Hero content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                <h1
                    className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    Intelligence for Every <span className="text-white/60">Neighborhood</span>
                </h1>
                <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/60">
                    The S&P 500 for real estate. Compare localities side-by-side using standardized, data-driven benchmarks and objective market signals.
                </p>
            </div>

        </section>
    );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import WaitlistModal from "./WaitlistModal";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">

                {/* Main bar */}
                <div className="flex h-14 sm:h-16 w-full items-center justify-between px-4 sm:px-8 lg:px-16">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl sm:text-2xl font-extrabold tracking-tight text-white no-underline"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Place<span className="text-white/60">Index</span>
                    </Link>

                    {/* Join the Waitlist — desktop (sm and above) */}
                    <button
                        onClick={() => setModalOpen(true)}
                        className="hidden sm:block rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-80 border-none cursor-pointer"
                    >
                        Join the Waitlist
                    </button>

                    {/* Hamburger — mobile only */}
                    <button
                        className="flex sm:hidden flex-col justify-center gap-[5px] w-10 h-10 bg-transparent border-none cursor-pointer"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span
                            className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
                        />
                        <span
                            className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
                        />
                        <span
                            className={`block h-0.5 w-6 rounded bg-white transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
                        />
                    </button>
                </div>

                {/* Mobile dropdown */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out sm:hidden ${menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                    <div className="flex flex-col gap-3 px-4 pb-5 pt-2">
                        <button
                            onClick={() => { setMenuOpen(false); setModalOpen(true); }}
                            className="w-full rounded-full bg-white py-3 text-center text-sm font-semibold text-black border-none cursor-pointer active:opacity-70"
                        >
                            Join the Waitlist
                        </button>
                    </div>
                </div>
            </nav>

            {/* Waitlist Modal */}
            <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}

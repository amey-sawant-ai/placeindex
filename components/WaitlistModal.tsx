"use client";

import { useEffect, useRef, useState } from "react";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setSubmitted(false);
            setEmail("");
            setError("");
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");
        setSubmitted(true);
    };

    if (!isOpen) return null;

    return (
        <>
            <style>{`
                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes jello-vertical {
                    0%   { transform: scale3d(1, 1, 1); }
                    30%  { transform: scale3d(0.75, 1.25, 1); }
                    40%  { transform: scale3d(1.25, 0.75, 1); }
                    50%  { transform: scale3d(0.85, 1.15, 1); }
                    65%  { transform: scale3d(1.05, 0.95, 1); }
                    75%  { transform: scale3d(0.95, 1.05, 1); }
                    100% { transform: scale3d(1, 1, 1); }
                }
                .subscribe-btn .arrow {
                    position: absolute;
                    margin-right: 150px;
                    transition: all 0.3s;
                }
                .subscribe-btn:hover { color: white; }
                .subscribe-btn:hover .arrow {
                    margin-right: 0;
                    animation: jello-vertical 0.9s both;
                    transform-origin: right;
                }
                .subscribe-btn:active { transform: scale(0.9); }
                .input-wrapper:active .inbox-icon { transform: scale(1.3); }
                .email-input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px #292524 inset;
                    -webkit-text-fill-color: #ffffff;
                }

                /* Prevent zoom on iOS */
                @media (max-width: 639px) {
                    .email-input {
                        font-size: 16px !important;
                    }
                }

                /* Touch devices - increase tap targets */
                @media (hover: none) and (pointer: coarse) {
                    .close-btn {
                        width: 44px !important;
                        height: 44px !important;
                        font-size: 1.75rem !important;
                    }
                    .subscribe-btn {
                        min-height: 44px;
                    }
                }

                /* Landscape orientation on mobile */
                @media (max-width: 767px) and (orientation: landscape) {
                    .modal-card {
                        max-height: 90vh;
                        overflow-y: auto;
                    }
                    .modal-content {
                        padding-top: 1rem !important;
                        padding-bottom: 1rem !important;
                    }
                }

                /* Prevent zoom on iOS */
                @media (max-width: 639px) {
                    .email-input {
                        font-size: 16px !important;
                    }
                }
            `}</style>

            {/* Overlay */}
            <div
                className="fixed inset-0 z-[200] flex items-center justify-center px-3 sm:px-4"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                {/* Modal card */}
                <div
                    className="modal-card relative z-10 w-full max-w-md rounded-xl sm:rounded-2xl border border-white/10 bg-[#000000] p-5 sm:p-6 md:p-8 shadow-2xl"
                    style={{ animation: "modalIn 0.2s ease-out" }}
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="close-btn absolute right-3 top-3 sm:right-4 sm:top-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white active:bg-white/20 border-none bg-transparent cursor-pointer text-2xl sm:text-3xl leading-none"
                        aria-label="Close"
                    >
                        ×
                    </button>

                    {!submitted ? (
                        <div className="modal-content">
                            <h2
                                id="modal-title"
                                className="modal-title mb-1 sm:mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-white pr-8"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                Join the Waitlist
                            </h2>
                            <p className="modal-subtitle mb-5 sm:mb-6 md:mb-8 text-sm sm:text-base text-white/50">
                                Be the first to know when PlaceIndex launches.
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 sm:gap-4">
                                {/* Custom input wrapper */}
                                <div
                                    className="input-wrapper flex items-center rounded-[20px] bg-[#292524] p-[5px] w-full"
                                    style={{ height: "45px", boxSizing: "content-box" }}
                                >
                                    {/* Inbox icon */}
                                    <svg
                                        className="inbox-icon ml-2 shrink-0 w-[26px] fill-white transition-all duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <g data-name="Layer 2">
                                            <g data-name="inbox">
                                                <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
                                                <path d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H5.62z" />
                                            </g>
                                        </g>
                                    </svg>

                                    {/* Email input — grows to fill space */}
                                    <input
                                        ref={inputRef}
                                        type="email"
                                        name="email"
                                        placeholder="info@gmail.com"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                        className="email-input h-full min-w-0 flex-1 border-none bg-[#292524] pl-3 pr-2 text-sm sm:text-base text-white outline-none placeholder-white/40"
                                    />

                                    {/* Subscribe button */}
                                    <button
                                        type="submit"
                                        className="subscribe-btn relative flex h-full w-[95px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[15px] border-none bg-white font-medium text-sm sm:text-base text-black transition-all duration-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="10"
                                            viewBox="0 0 38 15"
                                            className="arrow"
                                        >
                                            <path d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z" />
                                        </svg>
                                        Subscribe
                                    </button>
                                </div>

                                {error && (
                                    <p className="w-full text-xs sm:text-sm text-red-400 px-1">{error}</p>
                                )}
                            </form>
                        </div>
                    ) : (
                        <div className="modal-content flex flex-col items-center gap-3 sm:gap-4 py-3 sm:py-4 text-center">
                            <div className="success-icon flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 text-2xl sm:text-3xl">
                                🎉
                            </div>
                            <h2
                                className="modal-title text-xl sm:text-2xl md:text-3xl font-bold text-white px-2"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                You&apos;re on the list!
                            </h2>
                            <p className="modal-subtitle text-sm sm:text-base text-white/50 px-2">
                                We&apos;ll notify <span className="text-white/80 break-all">{email}</span> when we launch.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-1 sm:mt-2 rounded-full bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black transition-opacity hover:opacity-80 active:opacity-60 cursor-pointer border-none"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
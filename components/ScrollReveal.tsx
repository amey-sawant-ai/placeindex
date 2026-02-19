"use client";

import { useEffect } from "react";

/**
 * ScrollReveal — attaches an IntersectionObserver to all elements
 * with .reveal, .reveal-left, or .reveal-scale classes.
 * When they enter the viewport, the .visible class is added,
 * triggering the CSS transition defined in globals.css.
 *
 * Motion principle: Staging + Follow-through (staggered children).
 */
export default function ScrollReveal() {
    useEffect(() => {
        const selectors = ".reveal, .reveal-left, .reveal-scale";
        const els = document.querySelectorAll<HTMLElement>(selectors);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target); // fire once
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        els.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return null;
}

// src/app/(root)/faq/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = ["All", "Shipping", "Returns", "Orders", "Products"];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

export default function FaqPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const heroTitle = "How Can We Help?";
    const categoryTitle = "Browse by Category";

    // 1. Create a ref to track the hero section
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { margin: "-50% 0px -50% 0px" });

    return (
        <main className="bg-dark-900 text-light-100">
            {/* Step 1: The Hero Section */}
            <section
                ref={heroRef} // 2. Attach the ref to the hero
                className="flex min-h-screen items-center justify-center overflow-hidden"
            >
                <motion.div
                    className="text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-heading-1 font-bold tracking-tight">
                        {heroTitle.split(" ").map((word, index) => (
                            <motion.span
                                key={index}
                                variants={itemVariants}
                                className="inline-block"
                            >
                                {word}&nbsp;
                            </motion.span>
                        ))}
                    </h1>
                </motion.div>
            </section>

            {/* This div will contain the rest of the page content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                {/* Step 2: The Category Filters Section */}
                {/* 3. Animate this section based on whether the hero is in view */}
                <motion.div
                    initial="hidden"
                    animate={!isHeroInView ? "visible" : "hidden"} // Animate only when hero is NOT in view
                    variants={containerVariants}
                    className="mb-20"
                >
                    <div className="mb-12 text-center">
                        <h2 className="text-heading-3 text-light-100">
                            {categoryTitle.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    variants={itemVariants}
                                    className="inline-block"
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </h2>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "rounded-full px-6 py-3 text-body-medium font-medium transition-colors duration-300",
                                    activeCategory === category
                                        ? "bg-light-100 text-dark-900"
                                        : "border border-light-100/30 bg-transparent text-light-100/80 hover:bg-light-100/10"
                                )}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                <div className="min-h-[50vh]">
                    {/* We will build the accordion here next */}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1 }}
                    className="mt-24 text-center"
                >
                    <h2 className="text-heading-2 font-bold text-light-100">Still have questions?</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lead text-light-100/70">
                        Our team is here to help. Get in touch with us and we'll get back to you as soon as possible.
                    </p>
                    <div className="mt-8">
                        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-light-100 px-8 py-4 text-body-medium font-semibold text-dark-900 transition-transform hover:scale-105">
                            Contact Us <ArrowRight size={20} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
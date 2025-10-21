// src/components/ui/faq-accordion.tsx
'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { motion, type Variants } from "framer-motion";
import { forwardRef } from 'react';

const faqItems = [
    {
        id: 'item-1',
        question: 'What sizes do you offer?',
        answer: 'We offer a wide range of sizes, from UK 3 to UK 13. You can find a detailed size guide on each product page to help you find the perfect fit.',
    },
    {
        id: 'item-2',
        question: 'How can I track my order?',
        answer: "Once your order has shipped, you will receive an email with a tracking number and a link to the courier's website. You can also track your order from your account page.",
    },
    {
        id: 'item-3',
        question: 'Do you ship internationally?',
        answer: "Currently, we only ship within South Africa. We are working on expanding our shipping options to international destinations in the near future.",
    },
    {
        id: 'item-4',
        question: 'What payment methods do you accept?',
        answer: "We accept all major credit cards (Visa, Mastercard), as well as secure payments through PayFast and Ozow.",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
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

interface FaqAccordionProps {
    animate: "visible" | "hidden";
}

// Wrap the component with forwardRef and name the function for better debugging
const FaqAccordion = forwardRef<HTMLDivElement, FaqAccordionProps>(function FaqAccordion({ animate }, ref) {
    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate={animate}
        >
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-8 md:grid-cols-5 md:gap-12">
                    <motion.div className="md:col-span-2" variants={itemVariants}>
                        <h2 className="text-light-100 text-4xl font-semibold">FAQs</h2>
                        <p className="text-light-100/70 mt-4 text-balance text-lg">
                            Everything you need to know about Shoe Republic
                        </p>
                        <p className="text-light-100/70 mt-6 hidden md:block">
                            Can&apos;t find what you&apos;re looking for? Reach out to our{' '} {/* Changed Can't and you're */}
                            <Link
                                href="/contact"
                                className="text-light-100 font-medium hover:underline"
                            >
                                customer support team
                            </Link>{' '}
                            for assistance.
                        </p>
                    </motion.div>

                    <motion.div className="md:col-span-3" variants={itemVariants} ref={ref}>
                        <Accordion type="single" collapsible>
                            {faqItems.map((item) => (
                                <AccordionItem key={item.id} value={item.id}>
                                    <AccordionTrigger className="cursor-pointer text-base text-light-100 font-medium hover:no-underline">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-light-100/70">
                                        <BlurredStagger text={item.answer} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>

                    <motion.p className="text-light-100/70 mt-6 md:hidden" variants={itemVariants}>
                        Can&apos;t find what you&apos;re looking for? Contact our{' '} {/* Changed Can't and you're */}
                        <Link
                            href="/contact"
                            className="text-light-100 font-medium hover:underline">
                            customer support team
                        </Link>
                    </motion.p>
                </div>
            </div>
        </motion.section>
    )
});

export default FaqAccordion;

// This is the animated text component
export const BlurredStagger = ({ text }: { text: string }) => {
    const headingText = text;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.015,
            },
        },
    };

    const letterAnimation = {
        hidden: { opacity: 0, filter: "blur(10px)" },
        show: { opacity: 1, filter: "blur(0px)" },
    };

    return (
        <motion.p
            variants={container}
            initial="hidden"
            animate="show"
            className="text-base leading-relaxed break-words whitespace-normal"
        >
            {/* Split and map the text, ensuring apostrophes are handled */}
            {headingText.split("").map((char, index) => (
                <motion.span
                    key={index}
                    variants={letterAnimation}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                >
                    {/* Render space as non-breaking space, handle apostrophe */}
                    {char === "'" ? "\u0027" : char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.p>
    );
};
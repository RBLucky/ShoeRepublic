// src/components/ui/faq-accordion.tsx
'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { motion } from "framer-motion";

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

export default function FaqAccordion() {
    return (
        <section>
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-8 md:grid-cols-5 md:gap-12">
                    <div className="md:col-span-2">
                        {/* Text and styling adapted for the dark theme */}
                        <h2 className="text-light-100 text-4xl font-semibold">FAQs</h2>
                        <p className="text-light-100/70 mt-4 text-balance text-lg">
                            Everything you need to know about Shoe Republic
                        </p>
                        <p className="text-light-100/70 mt-6 hidden md:block">
                            Can’t find what you’re looking for? Reach out to our{' '}
                            <Link
                                href="/contact" // Link now points to the correct contact page
                                className="text-light-100 font-medium hover:underline"
                            >
                                customer support team
                            </Link>{' '}
                            for assistance.
                        </p>
                    </div>

                    <div className="md:col-span-3">
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
                    </div>

                    <p className="text-light-100/70 mt-6 md:hidden">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            href="/contact"
                            className="text-light-100 font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

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
            {headingText.split("").map((char, index) => (
                <motion.span
                    key={index}
                    variants={letterAnimation}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.p>
    );
};
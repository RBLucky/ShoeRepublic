// src/components/SearchModal.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, LoaderCircle } from "lucide-react";
import { searchProducts, type SearchResultProduct } from "@/lib/actions/product";

// Debounce hook to prevent excessive API calls
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

// The SVG filter that creates the glass distortion effect
function GlassFilter() {
    return (
        <svg className="hidden">
            <defs>
                <filter id="glass-filter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.05 0.05"
                        numOctaves="1"
                        result="turbulence"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="10"
                    />
                </filter>
            </defs>
        </svg>
    );
}

export interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResultProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 300);

    const performSearch = useCallback(async () => {
        if (debouncedQuery.trim().length > 1) {
            setIsLoading(true);
            const data = await searchProducts(debouncedQuery);
            setResults(data);
            setIsLoading(false);
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        performSearch();
    }, [performSearch]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            <GlassFilter />
            {/* Backdrop with a blur effect */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                aria-hidden="true"
                onClick={onClose}
            />

            {/* Modal Panel - Styled with the glass effect */}
            <div className="absolute left-1/2 top-20 -translate-x-1/2 w-full max-w-2xl p-4">
                <div
                    className="relative transform overflow-hidden rounded-2xl bg-white/80 shadow-2xl ring-1 ring-black/10 transition-all"
                    style={{ backdropFilter: 'blur(20px)' }}
                >
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            {isLoading ? (
                                <LoaderCircle className="h-5 w-5 animate-spin text-dark-700" />
                            ) : (
                                <Search className="h-5 w-5 text-dark-700" aria-hidden="true" />
                            )}
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            // The focus:outline-none class has been added here
                            className="block w-full border-0 bg-transparent py-4 pl-12 pr-12 text-dark-900 placeholder:text-dark-700 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="Search for your next pair..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 p-4 text-dark-700 hover:text-dark-900"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close search</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    {(results.length > 0 || (debouncedQuery.length > 1 && !isLoading)) && (
                        <div className="border-t border-black/10 p-2">
                            {results.length > 0 && (
                                <ul className="max-h-96 overflow-y-auto">
                                    {results.map(product => (
                                        <li key={product.id}>
                                            <Link href={`/products/${product.id}`} onClick={onClose} className="flex items-center gap-4 rounded-lg px-4 py-3 hover:bg-black/5">
                                                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-white">
                                                    <Image src={product.imageUrl || '/shoes/shoe-1.jpg'} alt={product.name} layout="fill" objectFit="cover" />
                                                </div>
                                                <span className="text-body text-dark-900">{product.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {debouncedQuery.length > 1 && !isLoading && results.length === 0 && (
                                <div className="p-6 text-center text-body text-dark-700">
                                    <p>No results found for "{debouncedQuery}"</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
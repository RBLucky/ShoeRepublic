// src/app/(root)/checkout/page.tsx
"use client";

import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";
import Image from "next/image";

// A client-side component to safely render cart items
function OrderSummary() {
    const { items, total } = useCartStore();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        // Render a loading state or skeleton on the server and during initial client render
        return (
            <div className="space-y-4">
                <div className="h-16 w-full animate-pulse rounded-md bg-light-200" />
                <div className="h-16 w-full animate-pulse rounded-md bg-light-200" />
            </div>
        );
    }

    const shippingCost = items.length > 0 ? 5.00 : 0;
    const totalCost = total + shippingCost;

    return (
        <div>
            <h2 className="text-body-medium text-dark-900">Order summary</h2>
            <div className="mt-4 space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-light-300">
                            <Image src={item.image || '/shoes/shoe-1.jpg'} alt={item.name} layout="fill" objectFit="cover" />
                        </div>
                        <div className="flex-1">
                            <p className="text-body-medium text-dark-900">{item.name}</p>
                            <p className="text-caption text-dark-700">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-body text-dark-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="mt-6 space-y-2 border-t border-light-300 pt-4">
                <div className="flex justify-between text-body text-dark-700">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body text-dark-700">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-body-medium text-dark-900">
                    <span>Total</span>
                    <span>${totalCost.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

export default function CheckoutPage() {
    return (
        <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
                <h1 className="text-heading-2 text-dark-900">Checkout</h1>

                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section className="lg:col-span-7">
                        {/* Contact and Shipping Forms will go here */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-body-medium text-dark-900">Contact information</h2>
                                <div className="mt-4">
                                    <label htmlFor="email-address" className="block text-caption text-dark-900">Email address</label>
                                    <input type="email" id="email-address" name="email" autoComplete="email" className="mt-1 block w-full rounded-md border-light-300 shadow-sm focus:border-dark-500 focus:ring-dark-500 sm:text-sm" />
                                </div>
                            </div>

                            <div className="border-t border-light-300 pt-6">
                                <h2 className="text-body-medium text-dark-900">Shipping information</h2>
                                {/* Placeholder for shipping form fields */}
                                <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                                    {/* Form fields will be added in a later step */}
                                </div>
                            </div>

                            <div className="border-t border-light-300 pt-6">
                                <h2 className="text-body-medium text-dark-900">Payment details</h2>
                                {/* Placeholder for payment form fields */}
                            </div>
                        </div>
                    </section>

                    {/* Order summary */}
                    <section className="mt-16 rounded-lg bg-light-200/50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                        <OrderSummary />
                    </section>
                </form>
            </div>
        </main>
    );
}
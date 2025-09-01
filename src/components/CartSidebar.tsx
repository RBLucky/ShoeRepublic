// src/components/CartSidebar.tsx
"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { X, Minus, Plus, Trash2 } from "lucide-react";

export default function CartSidebar() {
    const {
        items,
        total,
        isOpen,
        closeCart,
        removeItem,
        updateQuantity,
    } = useCartStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                aria-hidden="true"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="absolute inset-y-0 right-0 flex max-w-full">
                <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-light-100 shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-heading-3 text-dark-900">Shopping Cart</h2>
                                <button
                                    type="button"
                                    className="-m-2 p-2 text-dark-700 hover:text-dark-900"
                                    onClick={closeCart}
                                >
                                    <span className="sr-only">Close panel</span>
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <div className="mt-8">
                                {items.length === 0 ? (
                                    <p className="text-center text-body text-dark-700">Your cart is empty.</p>
                                ) : (
                                    <ul role="list" className="-my-6 divide-y divide-light-300">
                                        {items.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-light-300">
                                                    <Image
                                                        src={item.image || "/shoes/shoe-1.jpg"} // Fallback image
                                                        alt={item.name}
                                                        width={96}
                                                        height={96}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-body-medium text-dark-900">
                                                            <h3>{item.name}</h3>
                                                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border border-light-300 rounded-md hover:bg-light-200"><Minus size={16} /></button>
                                                            <p className="text-dark-700 w-4 text-center">{item.quantity}</p>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border border-light-300 rounded-md hover:bg-light-200"><Plus size={16} /></button>
                                                        </div>
                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                className="font-medium text-red hover:text-red/80"
                                                                onClick={() => removeItem(item.id)}
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-light-300 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-body-medium text-dark-900">
                                <p>Subtotal</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <p className="mt-0.5 text-caption text-dark-700">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <a
                                    href="#" // This will later link to the checkout page
                                    className="flex items-center justify-center rounded-md border border-transparent bg-dark-900 px-6 py-3 text-body-medium text-light-100 shadow-sm hover:opacity-90"
                                >
                                    Checkout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
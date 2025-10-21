// src/app/(root)/shipping/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function ShippingPage() {
    return (
        <main className="bg-light-100">
            {/* Hero Section - Now full-width */}
            <div className="relative isolate overflow-hidden">
                <Image
                    src="/trending-2.png"
                    alt="Shoe Republic Shipping"
                    layout="fill"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
                    priority
                />
                {/* Added a subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
                    <h1 className="mx-auto max-w-2xl text-heading-2 font-bold tracking-tight text-white sm:text-6xl">
                        Shipping & Returns
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lead text-white/90">
                        We&apos;re committed to getting your order to you quickly and smoothly, with a straightforward returns process for your peace of mind. {/* Changed We're to We&apos;re */}
                    </p>
                </div>
            </div>

            {/* Content Section with improved spacing and background */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl rounded-2xl bg-light-200/30 p-8">

                    {/* Shipping Policy */}
                    <section className="mb-16">
                        <h2 className="text-heading-2 text-dark-900 mb-6 border-b border-light-300 pb-4">Domestic Shipping Policy</h2>

                        <h3 className="text-heading-3 text-dark-900 mt-8 mb-4">Order Processing</h3>
                        <div className="space-y-4 text-body text-dark-700">
                            <p>All orders are processed within <strong>1-2 business days</strong> (excluding weekends and holidays) after you receive your order confirmation email. You will receive another notification when your order has shipped.</p>
                            <p>Please note that during high-volume periods, such as sales or public holidays, processing times may be slightly longer. We appreciate your patience.</p>
                        </div>

                        <h3 className="text-heading-3 text-dark-900 mt-8 mb-4">Shipping Rates & Estimates</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-light-300 text-left text-body text-dark-700">
                                <thead className="bg-light-200/50 text-dark-900">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 font-medium">Shipping Option</th>
                                        <th scope="col" className="px-6 py-3 font-medium">Estimated Delivery Time</th>
                                        <th scope="col" className="px-6 py-3 font-medium">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-light-300">
                                    <tr>
                                        <td className="px-6 py-4">Standard Shipping (The Courier Guy / DSV)</td>
                                        <td className="px-6 py-4">3–5 business days</td>
                                        <td className="px-6 py-4">R99.00 (Free for orders over R1,500)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4">Express Shipping (Ram / Fastway)</td>
                                        <td className="px-6 py-4">1–2 business days</td>
                                        <td className="px-6 py-4">R150.00</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4">Local Collection (Midrand Warehouse)</td>
                                        <td className="px-6 py-4">Ready within 24 hours</td>
                                        <td className="px-6 py-4">Free</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-caption text-dark-500">Please note, delivery times are estimates and may vary for outlying areas.</p>

                        <h3 className="text-heading-3 text-dark-900 mt-8 mb-4">Local Collection</h3>
                        <p className="text-body text-dark-700">
                            You can skip the shipping fees with free local pickup at our Midrand warehouse. After placing your order and selecting local pickup at checkout, your order will be prepared and ready for pick up within 24 hours. We will send you an email when your order is ready along with instructions.
                        </p>
                    </section>

                    {/* Returns Policy */}
                    <section>
                        <h2 className="text-heading-2 text-dark-900 mb-6 border-b border-light-300 pb-4">Returns & Exchange Policy</h2>

                        <p className="text-body text-dark-700 mb-8">
                            We want you to be completely satisfied with your purchase. If you&apos;re not happy with your order for any reason, we offer a <strong>30-day return and exchange policy</strong> from the day you receive your item. {/* Changed you're to you&apos;re */}
                        </p>

                        <h3 className="text-heading-3 text-dark-900 mt-8 mb-4">Eligibility for a Return</h3>
                        <ul className="list-disc space-y-2 pl-5 text-body text-dark-700">
                            <li>Items must be unworn, unwashed, and in their original condition.</li>
                            <li>All original tags and packaging, including the shoebox, must be intact and returned with the item. The shoebox must be protected and not used as the shipping box.</li>
                            <li>You must provide proof of purchase (your order number or confirmation email).</li>
                            <li>Items marked as &quot;Final Sale&quot; are not eligible for returns or exchanges.</li> {/* Changed " to &quot; */}
                        </ul>

                        <h3 className="text-heading-3 text-dark-900 mt-8 mb-4">How to Initiate a Return</h3>
                        <div className="space-y-4 text-body text-dark-700">
                            <p>To start a return or exchange, please get in touch with our support team through our <Link href="/contact" className="font-semibold underline hover:text-dark-900">Contact Page</Link>. Please include your order number and the reason for your return.</p>
                            <p>The cost of return shipping is the responsibility of the customer. We recommend using a trackable shipping service, as we cannot be held responsible for items lost or damaged in transit.</p>
                        </div>

                        <h3 className="text-heading-3 text-dark-900 mt-8 mb-4">Refunds</h3>
                        <p className="text-body text-dark-700">
                            Once we receive and inspect your returned item, we will send you an email to notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days. Please note that original shipping costs are non-refundable.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
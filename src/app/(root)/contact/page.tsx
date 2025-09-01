// src/app/(root)/contact/page.tsx
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
                <h1 className="text-heading-2 text-dark-900">Get In Touch</h1>
                <p className="mx-auto mt-2 max-w-2xl text-lead text-dark-700">
                    Have a question or feedback? We'd love to hear from you.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                {/* Contact Form */}
                <section>
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-caption font-medium text-dark-900">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="name"
                                className="mt-1 block w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body text-dark-900 placeholder:text-dark-500 shadow-sm focus:border-dark-500 focus:ring-dark-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-caption font-medium text-dark-900">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                className="mt-1 block w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body text-dark-900 placeholder:text-dark-500 shadow-sm focus:border-dark-500 focus:ring-dark-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-caption font-medium text-dark-900">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="mt-1 block w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body text-dark-900 placeholder:text-dark-500 shadow-sm focus:border-dark-500 focus:ring-dark-500"
                                defaultValue={""}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full rounded-full bg-dark-900 px-6 py-3 text-body-medium text-light-100 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-dark-900/20"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </section>

                {/* Contact Details */}
                <section className="space-y-6 rounded-xl bg-light-200/50 p-8">
                    <h2 className="text-heading-3 text-dark-900">Contact Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 flex-shrink-0 text-dark-700" />
                            <div>
                                <h3 className="text-body-medium text-dark-900">Our Address</h3>
                                <p className="text-body text-dark-700">101 Innovation Drive, Kyalami Business Park, Midrand, Gauteng, 1685, South Africa</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 flex-shrink-0 text-dark-700" />
                            <div>
                                <h3 className="text-body-medium text-dark-900">Email Us</h3>
                                <a href="mailto:support@shoerepublic.com" className="text-body text-dark-700 hover:underline">support@shoerepublic.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 flex-shrink-0 text-dark-700" />
                            <div>
                                <h3 className="text-body-medium text-dark-900">Call Us</h3>
                                <a href="tel:+27112345678" className="text-body text-dark-700 hover:underline">+27 (011) 555 0192</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
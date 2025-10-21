// src/app/(root)/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="bg-light-100">
            {/* Hero Section - Styled exactly like the Shipping & Returns page */}
            <div className="relative isolate overflow-hidden">
                <Image
                    src="/trending-3.png" // Using the correct image for the About Us page
                    alt="Johannesburg Sneaker Culture"
                    layout="fill"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center brightness-50"
                    priority
                />
                {/* This div applies the dark overlay only to the layer above the image */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-32 lg:px-8">
                    <h1 className="mx-auto max-w-2xl text-heading-2 font-bold tracking-tight text-white sm:text-6xl">
                        Our Story: Forged in Jozi
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lead text-white/90">
                        Born from the vibrant streets of Johannesburg, Shoe Republic is more than a store—it&apos;s a tribute to a culture.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl rounded-2xl bg-light-200/30 p-8 sm:p-12">
                    <div className="space-y-8 text-body text-dark-700">
                        <h2 className="text-heading-3 text-dark-900">The Beginning</h2>
                        <p>
                            Shoe Republic started where all great stories do: with a shared passion. We were a collective of sneakerheads in Johannesburg who saw a gap. The global sneaker world was booming, but we felt the unique, ambitious spirit of South African street style wasn&apos;t fully represented. Like the pioneers at <span className="font-semibold text-dark-900">Shelflife</span> who built a community from the ground up, our goal was to create a home for our culture—a place that celebrated both the heritage of iconic footwear and the pulse of local trends.
                        </p>

                        <h2 className="text-heading-3 text-dark-900">Our Mission & Vision</h2>
                        <p>
                            Our mission is threefold: to curate a world-class selection of footwear, to champion local design, and to build a community that shares our passion for sneaker culture. We&apos;re inspired by the bold, unapologetic energy of brands like <span className="font-semibold text-dark-900">GalXBoy</span>, who prove that a brand can be a statement.
                        </p>
                        <p>
                            We envision Shoe Republic as more than just a retailer. We are a platform for expression, a hub for creativity, and a testament to the belief that your shoes tell your story. Whether you&apos;re making moves in the boardroom or on the streets of Braamfontein, we&apos;re here to make sure you do it in style.
                        </p>

                        <h2 className="text-heading-3 text-dark-900">Join The Republic</h2>
                        <p>
                            This is more than a transaction; it&apos;s an invitation to be part of a movement. We are constantly evolving, inspired by the city and the people who make it unique. Thank you for walking this journey with us.
                        </p>
                    </div>
                    <div className="mt-12 text-center">
                        <Link
                            href="/products"
                            className="inline-block rounded-full bg-dark-900 px-8 py-4 text-body-medium text-light-100 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
                        >
                            Explore Our Collections
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
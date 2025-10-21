import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="hidden lg:flex flex-col justify-between bg-dark-900 text-light-100 p-10">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-orange inline-flex items-center justify-center">
            {/* The logo image source will need to be updated */}
            <Image src="/logo.svg" alt="Shoe Republic" width={60} height={60} />
          </div>
        </div>

        <div className="space-y-4">
          {/* Slogan updated for Shoe Republic */}
          <h2 className="text-heading-2">Step Up Your Style</h2>
          <p className="max-w-md text-lead text-light-300">
            {/* Promotional text updated for Shoe Republic */}
            Join millions of sneaker enthusiasts and find your perfect pair with Shoe Republic.
          </p>
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-light-100/90" />
            <span className="h-2 w-2 rounded-full bg-light-100/50" />
            <span className="h-2 w-2 rounded-full bg-light-100/50" />
          </div>
        </div>

        {/* Copyright notice updated */}
        <p className="text-footnote text-light-400">© 2025 Shoe Republic. All rights reserved.</p>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
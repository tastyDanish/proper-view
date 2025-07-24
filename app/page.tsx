import AgentDialog from "@/components/landing/Agent-dialog";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className="flex flex-col items-center justify-center w-full grow px-4 py-12">
        <div className="flex flex-col items-center gap-6 max-w-xl w-full">
          {/* Logo Placeholder */}
          <div className="bg-white rounded-full shadow-lg p-4 mb-2">
            <Image
              src="/globe.svg"
              alt="Proper View Logo"
              width={64}
              height={64}
            />
          </div>
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Welcome to Proper View
          </h1>
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 text-center max-w-md">
            The modern platform for real estate agents to manage listings, track
            inquiries, and view analytics—all in one place.
          </p>
          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Link
              href="/listings"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
              View Listings
            </Link>
            <AgentDialog />
          </div>
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-center py-4 border-t bg-white/80 text-gray-500 text-sm">
        <div>This site built for TimelyCare's technical assessment</div>
      </footer>
    </div>
  );
}

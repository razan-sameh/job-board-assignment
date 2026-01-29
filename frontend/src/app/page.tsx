import { Briefcase, Check, MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-(--bg-from) via-(--bg-via) to-(--bg-to) relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-(--blob-purple/20) rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-(--blob-blue/20) rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-(--blob-indigo/20) rounded-full blur-3xl animate-float-slow"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 py-10 flex flex-col items-center justify-center">
        {/* Logo Icon */}
        <div className="mb-8 animate-fade-in-up">
          <Link
            href={"/"}
            className="w-20 h-20 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl shadow-purple-500/25 flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:rotate-3"
          >
            <Briefcase className="w-10 h-10 text-white" />
          </Link>
        </div>

        {/* Badge */}
        <div className="mb-10 animate-fade-in-up animation-delay-100">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-purple-100/50">
            <div className="w-7 h-7 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Trusted by leading companies
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center mb-6 animate-fade-in-up animation-delay-200">
          <span className="block text-5xl md:text-7xl font-bold mb-2 tracking-tight">
            Find Your Dream Job,
          </span>
          <span className="block text-5xl md:text-7xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
            Start Your Career
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-content text-lg md:text-xl max-w-2xl mb-12 leading-relaxed animate-fade-in-up animation-delay-300">
          Discover thousands of opportunities from top companies. Your next
          career move is just a click away.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-20 animate-fade-in-up animation-delay-400">
          <Link
            href={"/jobs"}
            className="group relative px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            Browse Jobs
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <span className="text-content text-sm">
            No account required to browse
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 w-full max-w-4xl animate-fade-in-up animation-delay-500">
          <div className="text-center group cursor-default">
            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
              10K+
            </div>
            <div className="text-gray-600 font-medium">Active Jobs</div>
          </div>
          <div className="text-center group cursor-default">
            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
              500+
            </div>
            <div className="text-gray-600 font-medium">Companies</div>
          </div>
          <div className="text-center group cursor-default">
            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
              50K+
            </div>
            <div className="text-content font-medium">Job Seekers</div>
          </div>
        </div>
      </div>
    </main>
  );
}

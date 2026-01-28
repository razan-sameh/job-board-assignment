export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 mb-8">
      <div className="absolute inset-0 opacity-30"></div>
      <div className="relative z-10">
        <h1 className="text-5xl text-white mb-4 tracking-tight">
          Find Your Dream Job
        </h1>
        <p className="text-xl text-indigo-100 font-medium max-w-2xl">
          Discover opportunities from top companies around the world
        </p>
      </div>
    </div>
  );
}

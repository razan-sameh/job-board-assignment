import { Suspense } from "react";
import { HeroSection } from "./components/HeroSection";
import { JobFilters } from "./components/JobFilters";
import LoadingSpinner from "@/component/ui/LoadingSpinner";
import JobBoard from "./components/JobBoard";

export default function JobPage() {
  return (
    <div className="min-h-screen pb-4">
      <HeroSection />
      <Suspense fallback={<LoadingSpinner />}>
        <JobFilters />
        <JobBoard />
      </Suspense>
    </div>
  );
}

'use client';
import Link from "next/link"; // import Link from next
import { MapPin, DollarSign, Briefcase } from "lucide-react";
import { typJob } from "@/content/types";
import { enmJobStatus } from "@/content/enums";

export function JobCard({ job, index }: { job: typJob; index: number }) {
  return (
    <div
      className="group bg-background rounded-2xl hover:shadow-lg transition-all duration-300 overflow-hidden border border-lightGray/50"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold ">{job.title}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              job.status === enmJobStatus.open
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {job.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-content/80 mb-4">
          <Briefcase className="w-4 h-4" />
          <span className="font-medium text-sm">{job.company}</span>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-content/80">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{job.location.name}</span>
          </div>
          <div className="flex items-center gap-2 text-content/80">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">{job.salary}</span>
          </div>
        </div>

        {/* Replace button with Link */}
        <Link
          href={`/jobs/${job.id}`} // replace with your job detail route
          className="block text-center w-full py-3 bg-lightGray/20 rounded-xl border border-lightGray/20 font-semibold hover:bg-lightGray/30 transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

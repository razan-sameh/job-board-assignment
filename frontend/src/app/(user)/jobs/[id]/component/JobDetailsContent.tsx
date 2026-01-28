"use client";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
} from "lucide-react";
import { enmJobStatus, formatDate, typJob } from "@jobboard/shared/types";

interface JobDetailsContentProps {
  job: typJob;
}

export default function JobDetailsContent({ job }: JobDetailsContentProps) {
  const isOpen = job.status === enmJobStatus.open;
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Back button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-content/80 hover:text-content transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Jobs</span>
        </Link>

        {/* Main card */}
        <div className="bg-background/80 rounded-3xl border border-lightGray/50 overflow-hidden">
          {/* Header section */}
          <div className="p-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 tracking-tight">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 text-lg text-content">
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">{job.company}</span>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-full font-semibold text-sm ${
                  isOpen
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {isOpen ? "Open" : "Closed"}
              </div>
            </div>

            {/* Meta information */}
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2 text-content">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-content">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-content">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span className="font-medium">{formatDate(job.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Job description section */}
          <div className="p-10 pt-5">
            {/* Introduction */}
            <div>
              <h2 className="text-xl font-bold mb-4">Job Description:</h2>
              <p className="text-lg text-content leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>

          {/* Apply button */}
          {isOpen && (
            <div className="p-10 b-t border-t border-lightGray/50">
              <button className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                Apply for this Job
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

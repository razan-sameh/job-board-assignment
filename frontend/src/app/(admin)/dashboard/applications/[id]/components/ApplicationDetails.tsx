"use client";

import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { formatDate } from "@/content/utils";
import { useApplicationById } from "@/lib/hooks/useApplications";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplicationDetails({
  applicationId,
}: {
  applicationId: number;
}) {
  const router = useRouter();
  const { data: applicationData, isLoading } = useApplicationById(applicationId);
    
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-content mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Applications</span>
      </button>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Application Details</h1>
        <p className="text-content">
          {applicationData?.user.fullName} - {applicationData?.job.title}
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-background rounded-xl shadow-sm border border-lightGray/50 p-8">
        {/* Two Column Grid for Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Applicant Name */}
          <div>
            <label className="block text-sm font-medium text-content mb-2">
              Applicant Name
            </label>
            <p className="text-base font-medium">
              {applicationData?.user.fullName}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-content mb-2">
              Email
            </label>
            <p className="text-base  font-medium">{applicationData?.user.email}</p>
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-content mb-2">
              Job Title
            </label>
            <p className="text-base font-medium">{applicationData?.job.title}</p>
          </div>

          {/* Applied Date */}
          <div>
            <label className="block text-sm font-medium text-content mb-2">
              Applied Date
            </label>
            <p className="text-base font-medium">
              {formatDate(applicationData?.createdAt)}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-content mb-2">
            Status
          </label>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
            {applicationData?.status}
          </span>
        </div>

        {/* Resume / CV */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-content mb-3">
            Resume / CV
          </label>
          <div className="bg-body border border-lightGray/50 rounded-lg p-4">
            <p className="text-sm text-content leading-relaxed">
              {applicationData?.resumeText}
            </p>
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium text-content mb-3">
            Cover Letter
          </label>
          <div className="bg-body border border-lightGray/50 rounded-lg p-4">
            <p className="text-sm text-content leading-relaxed">
              {applicationData?.coverLetter}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

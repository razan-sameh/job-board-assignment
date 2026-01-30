"use client";

import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { typApplication } from "@/content/types";
import { applicationStatusColors } from "@/content/utils";
import { useApplications } from "@/lib/hooks/useApplications";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function ApplicationsManagepage() {
  const { data: applications = [], isLoading } = useApplications();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold  mb-2">Applications</h1>
        <p className="text-content">View and manage all job applications</p>
      </div>

      {/* Applications Table */}
      <div className="bg-background rounded-xl shadow-sm border border-lightGray/50">
        <div className="p-6 border-b border-lightGray/50">
          <h2 className="text-lg font-semibold ">All Applications</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-lightGray/50 bg-lightGray/20">
                <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                  Job Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                  Applicant Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                  Applied Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lightGray/50">
              {applications.map((application: typApplication) => (
                <tr
                  key={application.id}
                  className="hover:bg-lightGray/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-content">
                    {application.job.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-content">
                    {application.user.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-content">
                    {application.user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${applicationStatusColors[application.status]}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-content">
                    {application.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/applications/${application.id}`}
                      className="text-content text-sm flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

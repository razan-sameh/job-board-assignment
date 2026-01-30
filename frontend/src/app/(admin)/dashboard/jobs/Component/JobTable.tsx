"use client";
import { enmJobStatus } from "@/content/enums";
import { typJob } from "@/content/types";
import { formatDate } from "@/content/utils";
import { useDeleteJob, useJobs } from "@/lib/hooks/useJobs";
import { Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function JobTable() {
  const { data: jobs } = useJobs({ page: 1, pageSize: 10 });
  const { mutateAsync } = useDeleteJob();

  // Track which job ID is being deleted
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id); // disable only this button
      await mutateAsync(id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null); // reset after delete
    }
  };

  return (
    <div className="bg-background rounded-xl shadow-sm border border-lightGray/50">
      <div className="p-6 border-b border-lightGray/50">
        <h2 className="text-lg font-semibold ">All Job Postings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-lightGray/50 bg-lightGray/20">
              <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                Title
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                Company
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                Location
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                Salary
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                Created
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lightGray/50">
            {jobs.data.map((job: typJob) => (
              <tr
                key={job.id}
                className="hover:bg-lightGray/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium">{job.title}</td>
                <td className="px-6 py-4 text-sm text-content">
                  {job.company}
                </td>
                <td className="px-6 py-4 text-sm text-content">
                  {job.location.name}
                </td>
                <td className="px-6 py-4 text-sm text-content">{job.salary}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === enmJobStatus.open
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-content">
                  {formatDate(job.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/dashboard/jobs/${job.id}/edit`}
                      className="text-content hover:text-background text-sm flex items-center gap-1 transition-colors"
                    >
                      <Pen className="w-4 h-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
                      disabled={deletingId === job.id}
                      className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1 transition-colors"
                    >
                      {deletingId !== job.id && <Trash2 className="w-4 h-4" />}
                      <span>
                        {deletingId === job.id ? "Deleting..." : "Delete"}
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobTable;

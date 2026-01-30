"use client";

import LoadingSpinner from "@/component/ui/LoadingSpinner";
import { enmRole } from "@/content/enums";
import { typUser } from "@/content/types";
import { useJobSeekers } from "@/lib/hooks/useAdmin";
import { UserRound } from "lucide-react";

export default function JobSeekersManagePage() {
  const { data: users = [], isLoading } = useJobSeekers();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold  mb-2">Job Seekers</h1>
        <p className="text-content">Manage registered users</p>
      </div>

      {/* Users Table */}
      <div className="bg-background rounded-xl shadow-sm border border-lightGray/50">
        <div className="p-6 border-b border-lightGray/50">
          <h2 className="text-lg font-semibold ">All Job Seekers</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-lightGray/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                  Full Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-content">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lightGray/50">
              {users.map((user: typUser) => (
                <tr
                  key={user.id}
                  className="hover:bg-lightGray/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserRound className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium ">
                        {user.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-content">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
                        user.role === enmRole.admin
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
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

"use client";

import { typApplication } from "@/content/types";
import { enmApplicationStatus } from "@/content/enums";
import ApplicationContent from "./ApplicationContent";
import { formatDate, applicationStatusColors } from "@/content/utils";
import { Calendar } from "lucide-react";

interface ApplicationCardProps {
  application: typApplication;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <div className="bg-background rounded-lg border border-lightGray/50 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">{application.job.title}</h2>
          <div className="flex items-center text-sm text-content">
            <Calendar className="w-4 h-4 mr-1"/>
            Applied on {formatDate(application.createdAt)}
          </div>
        </div>

        <span
          className={`${applicationStatusColors[application.status]} px-4 py-1 rounded-full text-sm font-medium`}
        >
          {application.status}
        </span>
      </div>

      <ApplicationContent application={application} />

      {application.status === enmApplicationStatus.rejected && (
        <div className="mt-4 text-gray-300 text-sm">
          <p>Activate Windows</p>
          <p>Go to Settings to activate Windows.</p>
        </div>
      )}
    </div>
  );
}


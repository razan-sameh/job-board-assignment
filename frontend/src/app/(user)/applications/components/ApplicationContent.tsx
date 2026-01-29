"use client";

import { typApplication } from "@/content/types";

interface ApplicationContentProps {
  application: typApplication;
}

export default function ApplicationContent({ application }: ApplicationContentProps) {
  return (
    <>
      {application.resumeText && (
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Resume</h3>
          <p className="text-content text-sm">{application.resumeText}</p>
        </div>
      )}

      {application.coverLetter && (
        <div>
          <h3 className="font-semibold mb-1">Cover Letter</h3>
          <p className="text-content text-sm">{application.coverLetter}</p>
        </div>
      )}
    </>
  );
}

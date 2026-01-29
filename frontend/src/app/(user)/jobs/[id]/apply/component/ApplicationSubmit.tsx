"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateApplication } from "@/lib/hooks/useApplications";

interface JobApplicationSubmitProps {
  jobId: number;
}
export default function ApplicationSubmit({ jobId }: JobApplicationSubmitProps) {
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const router = useRouter();

  const { mutateAsync, isPending, error } = useCreateApplication();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mutateAsync({
        jobId,
        resumeLink: resume,
        coverLetter,
      });

      // بعد النجاح
      router.push("/applications");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setResume("");
    setCoverLetter("");
    router.back();
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-xl p-8">
        <h1 className="text-2xl font-semibold mb-2">
          Apply for Senior Frontend Developer
        </h1>
        <p className="text-content/80 mb-8">
          Fill in the information below to submit your application
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Resume / CV
            </label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume link."
              required
              className="w-full px-4 py-3 border rounded-lg h-32"
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Cover Letter
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter..."
              required
              className="w-full px-4 py-3 border rounded-lg h-32"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500">
              {(error as Error).message}
            </p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="px-6 py-2.5 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 text-white bg-primary rounded-lg"
            >
              {isPending ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

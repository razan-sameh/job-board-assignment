"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJobLocations, useJobsById, useUpdateJob } from "@/lib/hooks/useJobs";
import { enmJobStatus } from "@/content/enums";
import { CustomSelect } from "@/app/(user)/jobs/components/CustomSelect";
import { ArrowLeft } from "lucide-react";
import { EditJobFormData, editJobSchema } from "./editJobSchema";

export default function EditJob({ jobId }: { jobId: number }) {
  const router = useRouter();
  const { data: job, isLoading } = useJobsById(jobId);
  const { data: locations = [] } = useJobLocations();
  const { mutateAsync, isPending } = useUpdateJob();
  const locationOptions = locations?.map((loc) => ({
    label: loc.name,
    value: loc.id.toString(),
  }));

  const statusOptions = [
    { label: "Open", value: enmJobStatus.open },
    { label: "Closed", value: enmJobStatus.closed },
  ];

  // ------------------- REACT HOOK FORM -------------------
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditJobFormData>({
    resolver: zodResolver(editJobSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      location: "",
      salaryRange: 0,
      status: enmJobStatus.open,
      jobDescription: "",
    },
  });

  // Prefill the form when job data is loaded
  useEffect(() => {
    if (job) {
      setValue("jobTitle", job.title);
      setValue("companyName", job.company);
      setValue("location", job.location?.id?.toString() || "");
      setValue("salaryRange", job.salary);
      setValue("status", job.status === enmJobStatus.open ?enmJobStatus.open :enmJobStatus.closed);
      setValue("jobDescription", job.description);
    }
  }, [job, setValue]);

  const onSubmit = async (data: EditJobFormData) => {
    try {
      await mutateAsync({
        id: jobId,
        title: data.jobTitle,
        company: data.companyName,
        description: data.jobDescription,
        locationId: Number(data.location),
        salary: data.salaryRange,
        status: data.status,
      });

      router.back();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-content mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Jobs</span>
      </button>

      {/* Form Card */}
      <div className="bg-background rounded-xl shadow-sm border border-lightGray/50 p-8">
        <h1 className="text-2xl font-bold mb-8">Edit Job</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("jobTitle")}
                className="w-full px-4 py-2.5 bg-lightGray/20 border border-lightGray/50 rounded-lg"
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("companyName")}
                className="w-full px-4 py-2.5 bg-lightGray/20 border border-lightGray/50 rounded-lg"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={locationOptions!}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select Location"
                  />
                )}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Salary Range <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("salaryRange", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 bg-lightGray/20 border border-lightGray/50 rounded-lg"
              />
              {errors.salaryRange && (
                <p className="text-red-500 text-sm mt-1">{errors.salaryRange.message}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  options={statusOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Status"
                />
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("jobDescription")}
              rows={6}
              className="w-full px-4 py-2.5 bg-lightGray/20 border border-lightGray/50 rounded-lg"
            />
            {errors.jobDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.jobDescription.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 bg-primary text-white rounded-lg disabled:opacity-60"
            >
              {isPending ? "Updating..." : "Update Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

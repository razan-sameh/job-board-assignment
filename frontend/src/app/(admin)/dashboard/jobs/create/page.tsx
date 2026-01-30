"use client";

import { CustomSelect } from "@/app/(user)/jobs/components/CustomSelect";
import { typLocation } from "@/content/types";
import { useCreateJob, useJobLocations } from "@/lib/hooks/useJobs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateJobFormData, createJobSchema } from "./createJobSchema ";
import { enmJobStatus } from "@/content/enums";

/* ------------------ COMPONENT ------------------ */
export default function AddNewJob() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateJob();
  const { data: locations = [] } = useJobLocations();
  const statusOptions = [
    { label: "Open", value: enmJobStatus.open },
    { label: "Closed", value: enmJobStatus.closed},
  ];
  const locationOptions = locations?.map((loc: typLocation) => ({
    label: loc.name,
    value: loc.id.toString(),
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      status: enmJobStatus.open,
    },
  });

  const onSubmit = async (data: CreateJobFormData) => {
    try {
      await mutateAsync({
        title: data.jobTitle,
        company: data.companyName,
        description: data.jobDescription,
        locationId: Number(data.location),
        salary: Number(data.salaryRange),
        status: data.status,
      });

      router.back();
    } catch (err) {
      console.error(err);
    }
  };

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
        <h1 className="text-2xl font-bold mb-8">Add New Job</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("jobTitle")}
                placeholder="e.g., Senior Frontend Developer"
                className="w-full px-4 py-2.5 bg-lightGray/20 border border-lightGray/50 rounded-lg"
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("companyName")}
                placeholder="e.g., TechCorp Inc."
                className="w-full px-4 py-2.5 bg-lightGray/20 border border-lightGray/50 rounded-lg"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Salary Range <span className="text-red-500">*</span>
              </label>
              <input
                {...register("salaryRange")}
                placeholder="e.g., 120000"
                className="w-full px-4 py-2.5 bg-lightGray/20 border border-lightGray/50 rounded-lg"
              />
              {errors.salaryRange && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.salaryRange.message}
                </p>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("jobDescription")}
              placeholder="Enter detailed job description, responsibilities, requirements, etc."
              rows={6}
              className="w-full px-4 py-2.5 bg-lightGray/20 border border-lightGray/50 rounded-lg"
            />
            {errors.jobDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.jobDescription.message}
              </p>
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
              {isPending ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

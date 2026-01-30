"use client";

import { Search } from "lucide-react";
import { CustomSelect } from "./CustomSelect";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useJobLocations } from "@/lib/hooks/useJobs";
import { typLocation } from "@/content/types";

export function JobFilters() {
  const { data: locations = [] } = useJobLocations(); // typLocation[]
  const searchParams = useSearchParams();
  const router = useRouter();

  // Location: store the location id (number) or "all"
  const [locationFilter, setLocationFilter] = useState<string>(
    searchParams.get("location") ?? "all",
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") ?? "all",
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const locationOptions = [
    { label: "All Locations", value: "all" },
    ...(locations! || []).map((loc: typLocation) => ({
      label: loc.name,
      value: loc.id.toString(),
    })),
  ];

  const statusOptions = [
    { label: "All Status", value: "all" },
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
  ];

  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 600);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Location
    if (locationFilter !== "all") {
      params.set("location", locationFilter);
    } else {
      params.delete("location");
    }

    // Status
    if (statusFilter !== "all") {
      params.set("status", statusFilter);
    } else {
      params.delete("status");
    }

    // Search
    if (debouncedSearch.trim() !== "") {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [locationFilter, statusFilter, debouncedSearch]);

  return (
    <div className="bg-background rounded-2xl p-6 mb-8 border border-lightGray/50">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content" />
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-lightGray/20 border border-lightGray/20 rounded-xl"
          />
        </div>
        <div className="flex-1">
          <CustomSelect
            options={locationOptions}
            value={locationFilter}
            onChange={setLocationFilter}
            placeholder="Select Location"
          />
        </div>
        <div className="flex-1">
          <CustomSelect
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Select Status"
          />
        </div>
      </div>
    </div>
  );
}

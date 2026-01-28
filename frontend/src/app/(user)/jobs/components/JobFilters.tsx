"use client";
import { Search } from "lucide-react";
import { CustomSelect } from "./CustomSelect";
import { useEffect, useState } from "react";
import { useJobLocations } from "@jobboard/shared/hooks/useJobs";
import { useRouter, useSearchParams } from "next/navigation";

export function JobFilters() {
  const { data: locations = [] } = useJobLocations();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [locationFilter, setLocationFilter] = useState(
    searchParams.get("location") ?? "All Locations",
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") ?? "All Status",
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const locationOptions = ["All Locations", ...locations];
  const statusOptions = ["All Status", "open", "closed"];

  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // Update debouncedSearch after 500ms of inactivity
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 600); // 600ms debounce

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Update URL params when filters or debounced search change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Location
    if (locationFilter !== "All Locations") {
      params.set("location", locationFilter);
    } else {
      params.delete("location");
    }

    // Status
    if (statusFilter !== "All Status") {
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

        <CustomSelect
          options={locationOptions}
          value={locationFilter}
          onChange={setLocationFilter}
          placeholder="Select Location"
        />

        <CustomSelect
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Select Status"
        />
      </div>
    </div>
  );
}

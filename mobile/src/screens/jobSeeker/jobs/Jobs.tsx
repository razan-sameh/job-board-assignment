import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "src/contexts/ThemeContext";
import { moderateScale } from "src/theme/responsive";
import { createStyles } from "./JobsStyle";
import { useJobs } from "src/hooks/useJobs";
import { typJob } from "src/utils/types";
import { enmJobStatus } from "src/utils/enums";
import FilterModal, { FilterState } from "./filterModal/FilterModal";

const Jobs = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    location: "all",
  });

  const { data: jobData } = useJobs({ search: searchQuery });

  // Apply filters
  const filteredJobs = useMemo(() => {
    if (!jobData?.data) return [];

    return jobData.data.filter((job: typJob) => {
      // Search filter
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        filters.status === "all" || job.status === filters.status;

      // Location filter
      const matchesLocation =
        filters.location === "all" || job.location.id === filters.location;

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [jobData, searchQuery, filters]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const hasActiveFilters =
    filters.status !== "all" || filters.location !== "all";

  const renderJobCard = ({ item }: { item: typJob }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <View style={styles.companyRow}>
            <Ionicons
              name="business-outline"
              size={moderateScale(14)}
              color={theme.textSecondary}
            />
            <Text style={styles.companyText}>{item.company}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === enmJobStatus.open ? "#10B981" : theme.textSecondary,
            },
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === enmJobStatus.open ? "Open" : "Closed"}
          </Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.detailRow}>
          <Ionicons
            name="location-outline"
            size={moderateScale(16)}
            color={theme.textSecondary}
          />
          <Text style={styles.detailText}>{item.location.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="cash-outline"
            size={moderateScale(16)}
            color={theme.textSecondary}
          />
          <Text style={styles.detailText}>${item.salary}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === theme ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Browse Jobs</Text>
          <TouchableOpacity
            onPress={() => setFilterModalVisible(true)}
            style={styles.filterButton}
          >
            <Ionicons
              name="filter-outline"
              size={moderateScale(24)}
              color={theme.text}
            />
            {hasActiveFilters && <View style={styles.filterBadge} />}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={moderateScale(20)}
            color={theme.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Job Count */}
        <Text style={styles.jobCount}>{filteredJobs.length} jobs found</Text>
      </View>

      {/* Job List */}
      <FlatList
        data={filteredJobs || []}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.listContainer,
          filteredJobs.length === 0 && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="briefcase-outline"
              size={moderateScale(48)}
              color={theme.textSecondary}
            />
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
    </View>
  );
};

export default Jobs;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "src/contexts/ThemeContext";
import { moderateScale } from "src/theme/responsive";
import { createStyles } from "./FilterModalStyle";
import { useJobLocations } from "src/hooks/useJobs";
import { typLocation } from "src/utils/types";
import { enmJobStatus } from "src/utils/enums";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  status: "all" | enmJobStatus;
  location: "all" | number; // location ID or "all"
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedStatus, setSelectedStatus] = useState<"all" | enmJobStatus>(
    currentFilters.status
  );
  const [selectedLocation, setSelectedLocation] = useState<"all" | number>(
    currentFilters.location
  );
  const { data: locations = [] } = useJobLocations();

  useEffect(() => {
    if (visible) {
      setSelectedStatus(currentFilters.status);
      setSelectedLocation(currentFilters.location);
    }
  }, [visible, currentFilters]);

  const statusOptions = [
    { label: "All Jobs", value: "all" as const },
    { label: "Open", value: enmJobStatus.open },
    { label: "Closed", value: enmJobStatus.closed },
  ];

  const handleApply = () => {
    onApply({
      status: selectedStatus,
      location: selectedLocation,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedStatus("all");
    setSelectedLocation("all");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={moderateScale(24)} color={theme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalBody}
            showsVerticalScrollIndicator={false}
          >
            {/* Status Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Status</Text>
              <View style={styles.optionsContainer}>
                {statusOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionItem,
                      selectedStatus === option.value && styles.optionItemSelected,
                    ]}
                    onPress={() => setSelectedStatus(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedStatus === option.value && styles.optionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {selectedStatus === option.value && (
                      <Ionicons
                        name="checkmark"
                        size={moderateScale(20)}
                        color={theme.secondary}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Location Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Location</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedLocation === "all" && styles.optionItemSelected,
                  ]}
                  onPress={() => setSelectedLocation("all")}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedLocation === "all" && styles.optionTextSelected,
                    ]}
                  >
                    All Locations
                  </Text>
                  {selectedLocation === "all" && (
                    <Ionicons
                      name="checkmark"
                      size={moderateScale(20)}
                      color={theme.secondary}
                    />
                  )}
                </TouchableOpacity>
                {locations?.map((location: typLocation) => (
                  <TouchableOpacity
                    key={location.id}
                    style={[
                      styles.optionItem,
                      selectedLocation === location.id && styles.optionItemSelected,
                    ]}
                    onPress={() => setSelectedLocation(location.id)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedLocation === location.id && styles.optionTextSelected,
                      ]}
                    >
                      {location.name}
                    </Text>
                    {selectedLocation === location.id && (
                      <Ionicons
                        name="checkmark"
                        size={moderateScale(20)}
                        color={theme.secondary}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;
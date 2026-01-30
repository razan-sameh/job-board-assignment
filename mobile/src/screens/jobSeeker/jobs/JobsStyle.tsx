import { StyleSheet } from "react-native";
import { LightTheme } from "src/theme/colors";
import { heightScale, widthScale, moderateScale } from "src/theme/responsive";

export const createStyles = (theme: typeof LightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: heightScale(10),
      backgroundColor: theme.background,
    },
    header: {
      paddingHorizontal: widthScale(20),
      paddingBottom: heightScale(20),
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: heightScale(20),
    },
    headerTitle: {
      fontSize: moderateScale(24),
      fontWeight: "600",
      color: theme.text,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: widthScale(15),
      paddingVertical: heightScale(12),
      borderRadius: moderateScale(12),
      marginBottom: heightScale(15),
      backgroundColor: theme.card,
    },
    searchInput: {
      flex: 1,
      marginLeft: widthScale(10),
      fontSize: moderateScale(16),
      color: theme.text,
    },
    jobCount: {
      fontSize: moderateScale(14),
      fontWeight: "500",
      color: theme.textSecondary,
    },
    listContainer: {
      paddingHorizontal: widthScale(20),
      paddingBottom: heightScale(20),
    },
    jobCard: {
      backgroundColor: theme.card,
      borderRadius: moderateScale(16),
      padding: moderateScale(20),
      marginBottom: heightScale(15),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    jobHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: heightScale(15),
    },
    jobInfo: {
      flex: 1,
      marginRight: widthScale(10),
    },
    jobTitle: {
      fontSize: moderateScale(18),
      fontWeight: "600",
      marginBottom: heightScale(8),
      color: theme.text,
    },
    companyRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    companyText: {
      fontSize: moderateScale(14),
      marginLeft: widthScale(6),
      color: theme.textSecondary,
    },
    statusBadge: {
      paddingHorizontal: widthScale(12),
      paddingVertical: heightScale(6),
      borderRadius: moderateScale(20),
    },
    statusText: {
      color: "#FFFFFF",
      fontSize: moderateScale(12),
      fontWeight: "600",
    },
    jobDetails: {
      gap: heightScale(10),
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    detailText: {
      fontSize: moderateScale(14),
      marginLeft: widthScale(8),
      color: theme.textSecondary,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: moderateScale(40),
    },

    emptyTitle: {
      marginTop: moderateScale(12),
      fontSize: moderateScale(16),
      fontWeight: "600",
      color: theme.text,
    },

    emptySubtitle: {
      marginTop: moderateScale(4),
      fontSize: moderateScale(13),
      color: theme.textSecondary,
      textAlign: "center",
    },
    filterButton: {
      position: "relative",
      padding: moderateScale(4),
    },
    filterBadge: {
      position: "absolute",
      top: 2,
      right: 2,
      width: moderateScale(8),
      height: moderateScale(8),
      borderRadius: moderateScale(4),
      backgroundColor: "#EF4444",
    },
  });

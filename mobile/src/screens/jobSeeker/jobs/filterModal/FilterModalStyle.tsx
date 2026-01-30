import { StyleSheet } from "react-native";
import { widthScale, heightScale, moderateScale } from "src/theme/responsive";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: theme.background,
      borderTopLeftRadius: moderateScale(20),
      borderTopRightRadius: moderateScale(20),
      maxHeight: "80%",
      paddingBottom: heightScale(20),
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: widthScale(20),
      paddingTop: heightScale(20),
      paddingBottom: heightScale(15),
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    modalTitle: {
      fontSize: moderateScale(20),
      fontWeight: "600",
      color: theme.text,
    },
    modalBody: {
      paddingHorizontal: widthScale(20),
      paddingTop: heightScale(20),
    },
    filterSection: {
      marginBottom: heightScale(30),
    },
    filterLabel: {
      fontSize: moderateScale(16),
      fontWeight: "600",
      color: theme.text,
      marginBottom: heightScale(12),
    },
    optionsContainer: {
      gap: heightScale(10),
    },
    optionItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.input,
      paddingVertical: heightScale(14),
      paddingHorizontal: widthScale(16),
      borderRadius: moderateScale(12),
      borderWidth: 1,
      borderColor: theme.border,
    },
    optionItemSelected: {
      backgroundColor: theme.card,
      borderColor: theme.secondary,
      borderWidth: 2,
    },
    optionText: {
      fontSize: moderateScale(15),
      color: theme.textSecondary,
      fontWeight: "500",
    },
    optionTextSelected: {
      color: theme.text,
      fontWeight: "600",
    },
    modalFooter: {
      flexDirection: "row",
      paddingHorizontal: widthScale(20),
      paddingTop: heightScale(20),
      gap: widthScale(12),
    },
    resetButton: {
      flex: 1,
      paddingVertical: heightScale(14),
      borderRadius: moderateScale(12),
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },
    resetButtonText: {
      fontSize: moderateScale(16),
      fontWeight: "600",
      color: theme.textSecondary,
    },
    applyButton: {
      flex: 1,
      paddingVertical: heightScale(14),
      borderRadius: moderateScale(12),
      backgroundColor: theme.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    applyButtonText: {
      fontSize: moderateScale(16),
      fontWeight: "600",
      color: "#FFFFFF",
    },
  });
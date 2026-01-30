import { StyleSheet } from 'react-native';
import { LightTheme } from 'src/theme/colors';

export const createStyles = (theme: typeof LightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scroll: {
      flexGrow: 1,
    },
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingVertical: 48,
    },

    logoContainer: {
      alignItems: 'center',
      marginBottom: 32,
    },
    logoBox: {
      width: 80,
      height: 80,
      backgroundColor: theme.secondary,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },

    title: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.text,
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 4,
    },

    card: {
      backgroundColor: theme.card,
      borderRadius: 24,
      padding: 24,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 24,
    },

    field: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.input,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      color: theme.text,
    },
    inputError: {
      borderWidth: 1,
      borderColor: theme.error,
    },
    error: {
      color: theme.error,
      fontSize: 12,
      marginTop: 4,
    },

    primaryButton: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 16,
      cursor:'pointer'
    },
    primaryButtonText: {
      color: theme.background,
      fontSize: 16,
      fontWeight: '600',
    },

    signupRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 24,
    },
    signupText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    signupLink: {
      fontSize: 14,
      color: theme.primary,
      fontWeight: '500',
    },
  });

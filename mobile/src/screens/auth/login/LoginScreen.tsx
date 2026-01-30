import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather } from "@expo/vector-icons";
import { LoginFormData, loginSchema } from "./loginSchema";
import { createStyles } from "./LoginStyles";
import { useTheme } from "src/contexts/ThemeContext";
import { useLogin } from "src/hooks/useAuth";
import { enmRole } from "src/utils/enums";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function LoginScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { mutateAsync, error } = useLogin();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await mutateAsync({
        email: data.email,
        password: data.password,
      });
      if (result && result.user) {
        if (result.user.user_metadata.role === enmRole.admin) {
          navigation.replace("Admin");
        } else {
          navigation.replace("JobSeeker");
        }
      }
    } catch (err) {
      // Handle error
      console.error("Login Error:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.wrapper}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <Feather name="briefcase" size={32} color="white" />
            </View>
            <Text style={styles.title}>JobBoard</Text>
            <Text style={styles.subtitle}>Find your dream job</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome Back</Text>
            <Text style={styles.cardSubtitle}>Sign in to continue</Text>

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="you@example.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </View>

            {/* Sign In */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>
            {error && <Text style={styles.error}>{error.message}</Text>}
            {/* Sign Up */}
            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.signupLink}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

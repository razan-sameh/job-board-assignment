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
import { useTheme } from "src/contexts/ThemeContext";
import { useRegister } from "src/hooks/useAuth";
import { enmRole } from "src/utils/enums";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { createStyles } from "../login/LoginStyles";
import { RegisterFormData, registerSchema } from "./registerSchema";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function RegisterScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { mutateAsync, error } = useRegister();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await mutateAsync({
        email: data.email,
        password: data.password,
        fullName: data.fullName, // pass full name to your API
      });

      if (result && result.user) {
        if (result.user.user_metadata.role === enmRole.admin) {
          navigation.replace("Admin");
        } else {
          navigation.replace("JobSeeker");
        }
      }
    } catch (err) {
      console.error("Signup Error:", err);
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
            <Text style={styles.subtitle}>Create your account</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign Up</Text>
            <Text style={styles.cardSubtitle}>Join us today</Text>

            {/* Full Name */}
            <View style={styles.field}>
              <Text style={styles.label}>User Name</Text>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.fullName && styles.inputError]}
                    placeholder="John Doe"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.fullName && (
                <Text style={styles.error}>{errors.fullName.message}</Text>
              )}
            </View>

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

            {/* Sign Up */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>
            {error && <Text style={styles.error}>{error.message}</Text>}

            {/* Already have account */}
            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={styles.signupLink}> Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

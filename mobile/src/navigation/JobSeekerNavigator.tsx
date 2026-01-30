import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableWithoutFeedback, View } from "react-native";
import Jobs from "src/screens/jobSeeker/jobs/Jobs";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { moderateScale } from "src/theme/responsive";
import { useTheme } from "src/contexts/ThemeContext";
import { Text } from "react-native";
import { LightTheme } from "src/theme/colors";
import { useLogout } from "src/hooks/useAuth";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MyApplications from "src/screens/jobSeeker/myApplications/MyApplications";

const Tab = createBottomTabNavigator();

const TapNavigator = () => {
  const { theme, toggleTheme } = useTheme();
  const logoutMutation = useLogout();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigation.replace("Login");
      },
    });
  };

  return (
    <Tab.Navigator
      initialRouteName="Jobs"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: theme.primary,
        },
        headerStyle: { backgroundColor: theme.primary },
        headerTitleStyle: { color: theme.text },
        headerTintColor: theme.text,
      }}
    >
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerTitle: "Browse Jobs",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="briefcase"
              size={moderateScale(24)}
              color={focused ? theme.text : theme.textSecondary}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? theme.text : theme.textSecondary,
                fontSize: moderateScale(14),
                fontWeight: "500",
              }}
            >
              Jobs
            </Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              {/* Theme toggle */}
              <TouchableWithoutFeedback onPress={toggleTheme}>
                <Feather
                  name={theme === LightTheme ? "moon" : "sun"}
                  size={moderateScale(24)}
                  color={theme.text}
                  style={{ marginHorizontal: 10 }}
                />
              </TouchableWithoutFeedback>

              {/* Logout icon */}
              <TouchableWithoutFeedback onPress={handleLogout}>
                <MaterialIcons
                  name="logout"
                  size={moderateScale(24)}
                  color={theme.text}
                  style={{ marginHorizontal: 10 }}
                />
              </TouchableWithoutFeedback>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="MyApps"
        component={MyApplications}
        options={{
          headerTitle: "My Applications",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="file-text"
              size={moderateScale(24)}
              color={focused ? theme.text : theme.textSecondary}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? theme.text : theme.textSecondary,
                fontSize: moderateScale(14),
                fontWeight: "500",
              }}
            >
              My Applications
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TapNavigator;

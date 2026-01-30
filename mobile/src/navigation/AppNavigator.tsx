import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminNavigator from "./AdminNavigator";
import JobSeekerNavigator from "./JobSeekerNavigator";
import LoginScreen from "src/screens/auth/login/LoginScreen";
import RegisterScreen from "src/screens/auth/resgister/RegisterScreen";
import { enmRole } from "src/utils/enums";
import { useMe } from "src/hooks/useAuth";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useMe();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : user.role === enmRole.admin ? (
          <Stack.Screen options={{headerShown: false}} name="Admin" component={AdminNavigator} />
        ) : (
          <Stack.Screen options={{headerShown: false}} name="JobSeeker" component={JobSeekerNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

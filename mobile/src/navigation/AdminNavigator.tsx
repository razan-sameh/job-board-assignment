import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Dashboard from 'src/screens/admin/dashboard/Dashboard';

const Stack = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard">
      <Stack.Screen
        name="Dashboard"
        options={{headerShown: false}}
        component={Dashboard}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;

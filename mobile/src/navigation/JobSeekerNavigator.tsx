import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Jobs from 'src/screens/jobSeeker/jobs/Jobs';

const Stack = createNativeStackNavigator();

const JobSeekerNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Jobs">
      <Stack.Screen
        name="Jobs"
        options={{headerShown: false}}
        component={Jobs}
      />
    </Stack.Navigator>
  );
};

export default JobSeekerNavigator;

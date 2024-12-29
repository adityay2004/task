import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RouteName from './RouteName';
import DashBoard from '../screens/Dashboard/DashBoard';
import Schedule from '../screens/Dashboard/Schedule';
import ScheduleTime from '../screens/Dashboard/ScheduleTime';
import AppointmentDetails from '../screens/Dashboard/AppointmentDetails';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
      }}
      initialRouteName={RouteName.DASHBOARD_SCREEN}
    >
      <Stack.Screen name={RouteName.DASHBOARD_SCREEN} component={DashBoard} />
      <Stack.Screen name={RouteName.SCHEDULE_SCREEN} component={Schedule} />
      <Stack.Screen name={RouteName.SCHEDULE_TIME_SCREEN} component={ScheduleTime} />
      <Stack.Screen name={RouteName.APPOINTMENT_DETAILS_SCREEN} component={AppointmentDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

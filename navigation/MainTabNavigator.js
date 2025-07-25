import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import GiftCardScreen from '../screens/GiftCardScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;

          switch (route.name) {
            case 'Gift Cards':
              icon = 'card-outline';
              break;
            case 'Withdraw':
              icon = 'cash-outline';
              break;
            case 'History':
              icon = 'time-outline';
              break;
            case 'Profile':
              icon = 'person-circle-outline';
              break;
            case 'Admin':
              icon = 'settings-outline';
              break;
          }

          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Gift Cards" component={GiftCardScreen} />
      <Tab.Screen name="Withdraw" component={WithdrawScreen} />
      <Tab.Screen name="History" component={TransactionHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Admin" component={AdminDashboardScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

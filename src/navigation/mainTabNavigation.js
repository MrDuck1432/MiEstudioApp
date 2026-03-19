import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

// Importa tus páginas con los nombres que elegiste
import homePage from '../pages/homePage';
import promoPage from '../pages/promoPage';
import agendaPage from '../pages/agendaPage';
import historyPage from '../pages/historyPage';
import profilePage from '../pages/profilePage';

const Tab = createBottomTabNavigator();

export default function MainTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.brand,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          height: 70,
          borderRadius: 20,
          backgroundColor: theme.colors.card,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          ...theme.shadows.card,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={homePage} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-variant" size={26} color={color} />
        }}
      />
      <Tab.Screen 
        name="Promos" 
        component={promoPage} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="tag-outline" size={26} color={color} />
        }}
      />
      <Tab.Screen 
        name="Agenda" 
        component={agendaPage} 
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="plus-circle" size={48} color={theme.colors.brand} style={{ marginTop: -18 }} />
          ),
        }}
      />
      <Tab.Screen 
        name="Historial" 
        component={historyPage} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar-clock" size={26} color={color} />
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={profilePage} 
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle" size={26} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}
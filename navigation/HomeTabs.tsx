import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyBooks from '../screens/MyBooks';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>

      <Tab.Screen
        name="WishBooks"
        component={MyBooks}
        initialParams={{ type: 'wishBooks' }}
        options={{ title: 'Envie' }}
      />

      <Tab.Screen
        name="ReadBooks"
        component={MyBooks}
        initialParams={{ type: 'readBooks' }}
        options={{ title: 'Déjà lu' }}
      />

    </Tab.Navigator>
  );
}

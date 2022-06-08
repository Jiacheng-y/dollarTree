import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen } from './src/screens/AuthScreen';
import { BudgetScreen } from './src/screens/BudgetScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ExpensesScreen } from './src/screens/ExpensesScreen';
import { EditBudgetScreen } from './src/screens/EditBudgetScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from './src/store';
import React, { useState } from 'react';

export default App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <ScreenManager/>
      </NavigationContainer>
    </Provider>
  );
}

const ScreenManager = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  if (isSignedIn) {
    return <Tabs />
  } else {
    return <AuthScreen setAuthState={setIsSignedIn}/>
  }
}; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = "home"
          } else if (route.name === 'Budget') {
            iconName = "money-check";
          } else if (route.name === 'Expenses') {
            iconName = "dollar-sign"
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#004aad',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Budget" component={BudgetNavigator} 
        options={{ headerShown: false }}/>
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
    </Tab.Navigator>
    );
};

const BudgetNavigator = () => {
  return (
    <Stack.Navigator>
          <Stack.Screen
              name="Budget"
              component={BudgetScreen}
          />
          <Stack.Screen
              name="EditBudget"
              component={EditBudgetScreen}
          />
        </Stack.Navigator>
  );
};

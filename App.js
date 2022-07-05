import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen } from './src/Screens/AuthScreen';
import { BudgetScreen } from './src/Screens/BudgetScreen'
import { InsightsScreen } from './src/Screens/InsightsScreen';
import { ExpensesScreen } from './src/Screens/ExpensesScreen';
import { EditBudgetScreen } from './src/Screens/EditBudgetScreen';
import { EditExpensesScreen } from './src/Screens/EditExpensesScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from './src/Store';
import React, { useState } from 'react';
import TreeScreen from './src/Screens/TreeScreen';
import { SetDateScreen } from './src/Screens/SetDateScreen';

export default App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <ScreenManager />
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

          if (route.name === 'Insights') {
            iconName = "chart-line";
          } else if (route.name === 'Budget') {
            iconName = "money-check";
          } else if (route.name === 'Expenses') {
            iconName = "dollar-sign";
          } else if (route.name === 'Tree') {
            iconName = "tree";
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#004aad',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Budget" component={BudgetNavigator} 
        options={{ headerShown: false }}/>
      <Tab.Screen name="Expenses" component={ExpensesNavigator} 
        options={{ headerShown: false }}/>
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Tree" component={TreeScreen} />
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
              name="Add Budget"
              component={EditBudgetScreen}
          />
        </Stack.Navigator>
  );
};

const ExpensesNavigator = () => {
  return (
    <Stack.Navigator>
          <Stack.Screen
              name="Expenses"
              component={ExpensesScreen}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="Add Expenses"
              component={EditExpensesScreen}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="Select Month and Year"
              component={SetDateScreen}
              options={{ headerShown: false }}
          />
        </Stack.Navigator>
  );
};

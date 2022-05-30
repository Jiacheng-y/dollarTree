import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthScreen } from './src/screens/AuthScreen';
import { BudgetScreen } from './src/screens/BudgetScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { InOutFlowScreen } from './src/screens/InOutFlowScreen';
import { EditBudgetScreen } from './src/screens/EditBudgetScreen';
import { authState } from './src/firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';

export default App = () => {
  return (
    <NavigationContainer>
        <ScreenManager isSignedIn={authState()} />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabs = () => {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = "home"
        } else if (route.name === 'Budget') {
          iconName = "money-check";
        } else if (route.name === 'InOutFlow') {
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
      <Tab.Screen name="InOutFlow" component={InOutFlowScreen} />
    </Tab.Navigator>
    );
};

const ScreenManager = ({isSignedIn}) => {
  
  if (isSignedIn) {
    return tabs();
  } else {
    return <AuthScreen />
  }
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

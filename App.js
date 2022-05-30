import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthScreen } from './src/screens/AuthScreen';
import { BudgetScreen } from './src/screens/BudgetScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { InOutFlowScreen } from './src/screens/InOutFlowScreen';
import { authState } from './src/firebase';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default App = () => {
  return (
    <NavigationContainer>
        <ScreenManager isSignedIn={authState()} />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

const tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
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
}

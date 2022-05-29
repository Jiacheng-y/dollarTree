import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { AuthScreen } from './src/screens/AuthScreen';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView> 
        <AuthScreen />
      </SafeAreaView>
    </NavigationContainer>
  );
}
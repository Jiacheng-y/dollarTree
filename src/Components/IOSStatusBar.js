import { View } from 'react-native';
import Constants from 'expo-constants';

export const IOSStatusBar = ({color, opacity}) => {
    const HEIGHT = Constants.statusBarHeight;

    return (
        <View style={{backgroundColor: color, height: HEIGHT, opacity: opacity}}>
        </View>
    );
   
}


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthComponent from './components/auth/AuthComponent'; // Adjust this path as necessary
import HomeScreen from './app/home'; // This should be correct
import IndicativeInfo from './app/indicativeinfo'; // Ensure this is also correct


// Define the type for the stack's route parameters
export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  IndicativeInfo: undefined; // Define other routes as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthComponent} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="IndicativeInfo" component={IndicativeInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

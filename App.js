import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DiscountCalculatorComponent from './Screens/DiscountCalculator';
import HistoryComponent from './Screens/History';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{
        headerTitleAlign: 'left',
        headerTintColor: 'white',
        headerStyle: {
        backgroundColor: 'green',
        },
        }}>
        <Stack.Screen
          name="Home"
          component={DiscountCalculatorComponent}
          options={{
            title: 'Discount Calculator',
          }}
        />
     <Stack.Screen name="History" component={HistoryComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

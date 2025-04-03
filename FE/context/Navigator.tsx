import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '@/app/login/index';  // 현재 코드 위치
import OtherPage from '@/app/PEEPMain';  // 이동할 페이지 (예시)

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="OtherPage" component={OtherPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

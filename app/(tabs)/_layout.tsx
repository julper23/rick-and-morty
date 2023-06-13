import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import CapitulosScreen from './index'


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={CapitulosScreen} />
      <Tab.Screen name="Home2" component={CapitulosScreen} />
    </Tab.Navigator>
  );
}

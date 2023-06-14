import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import CapitulosScreen from './index'
import LocalizacionesScreen from './localizaciones'
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

export default function TabLayout() {
  const [numPag,setNumPag] = useState(0)
  const colorScheme = useColorScheme();
  const navigationState = useNavigationState((state) => state);
  const dispatch = useDispatch();
  
  const handlePressCap = () => {
    dispatch({ type: 'UPDATE_PAGINA', payload: 0 });
    dispatch({ type: 'UPDATE_BUSQUEDA_CAP', payload: "" });
  }
  const handlePressLoc = () => {
    dispatch({ type: 'UPDATE_PAGINA', payload: 1 });
  }

  return (
    <Tab.Navigator >
      <Tab.Screen name="Capítulos" component={CapitulosScreen} listeners={{
        tabPress: handlePressCap,
        tabLongPress: handlePressCap,
        blur: handlePressLoc,
      }}/>
      <Tab.Screen name="Localizaciones" component={LocalizacionesScreen} listeners={{
        tabPress: handlePressLoc,
        tabLongPress: handlePressLoc,
        blur: handlePressCap
      }}/>
    </Tab.Navigator>
  );
}

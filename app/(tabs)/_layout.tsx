import { useDispatch } from 'react-redux';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';

import CapitulosScreen from './index';
import LocalizacionesScreen from './localizaciones';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {

  const dispatch = useDispatch();
  
  //Cuando cambiamos entre Episodios y Localizaciones seteamos la pagina en el store y quitamos los filtros que hubiera en cada una
  const CambioDePagina = (pag: number ) => {
    dispatch({ type: 'UPDATE_PAGINA', payload: pag });
    dispatch({ type: pag===0?'UPDATE_BUSQUEDA_CAP':'UPDATE_BUSQUEDA_LOC', payload: "" }); 
  }

  return (
    <Tab.Navigator >
      <Tab.Screen name="EPISODIOS" component={CapitulosScreen} listeners={{
        tabPress: ()=>CambioDePagina(0),
        tabLongPress: ()=>CambioDePagina(0),
        focus: ()=>CambioDePagina(0),
      }}/>
      <Tab.Screen name="Localizaciones" component={LocalizacionesScreen} listeners={{
        tabPress: ()=>CambioDePagina(1),
        tabLongPress: ()=>CambioDePagina(1),
        focus: ()=>CambioDePagina(1),
      }}/>
    </Tab.Navigator>
  );
}

import { SetStateAction, useEffect, useState } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme,TextInput, Alert,StyleSheet, TouchableOpacity } from 'react-native';

import { useFonts } from 'expo-font';
import { SplashScreen, Stack  } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather,MaterialIcons  } from '@expo/vector-icons';

import store from "./../store"

import { Text, View } from '../components/Themed';

export {
  // Captura cualquier error lanzado por el componente Layout.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Asegurar que el botón de retroceso se mantenga al recargar los modals
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo router usa Error Boundaries para atrapar los errores en la navegación
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Provider store={store}>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </Provider>
  );
}

function RootLayoutNav() {

  const colorScheme = useColorScheme();

  const pagina = useSelector(state => state.pagina);
  const dispatch = useDispatch();

  const [buscando,setBuscando] = useState(false);
  const [texto, setTexto] = useState('');

  useEffect(()=>{setBuscando(false)},[pagina])
  
  //Depende de la pantalla se actualizara un texto u otro
  const buscar = () => {dispatch({ type: pagina===0?'UPDATE_BUSQUEDA_CAP':'UPDATE_BUSQUEDA_LOC', payload: texto });}

  const cancelarBuscar = () => {
    dispatch({ type: 'UPDATE_BUSQUEDA_CAP', payload: "" });
    dispatch({ type: 'UPDATE_BUSQUEDA_LOC', payload: "" });
    setBuscando(false)
  }

  const BotonConIcono = ({ onPress, icon }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {icon}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ title:'Rick and Morty',headerShown:true,
          //Si se esta buscando aparecera el textInput y si no, aparecera el titulo
          headerTitle: () => (
            buscando?
            <View style={{height:35,width:170,backgroundColor:"rgba(0,0,0,0)"}}>
              <TextInput
              style={{
                flex: 1,
                height:30,
                paddingLeft:10,
                borderWidth:1,
                backgroundColor:"white",
                borderRadius:5

              }}
              placeholder="Buscar..."
              onChangeText={text => setTexto(text)}
              onSubmitEditing={(event: { nativeEvent: { text: any; }; }) => {
                const searchTerm = event.nativeEvent.text;
                Alert.alert('Valor de búsqueda:', searchTerm);
              }}
            />
            </View>
            :
            <View style={{backgroundColor:"rgba(0,0,0,0)"}}>
              <Text style={{fontWeight:"900",fontSize:20}}>Rick and Morty</Text>
            </View>
            
          ),
          //Si no se esta buscando aparecera un boton que al ser pulsado permitira al usuario filtrar por nombre
          //Si se esta buscando aparecera el boton para empezar la busqueda y el boton para detener la busqueda
          headerRight: () => (
            buscando?
              <View style={{backgroundColor:"rgba(0,0,0,0)",display:"flex",flexDirection:"row"}}>
                {/*Boton para lanzar la busqueda por nombre*/}
                <BotonConIcono onPress={()=>{buscar()}} icon={<Feather name="search" size={20} color="black" />}/>
                {/*Boton para cancelar cualquier busqueda*/}
                <BotonConIcono onPress={()=>{cancelarBuscar()}} icon={<MaterialIcons name="cancel" size={20} color="black" />}/>
              </View>
            :
              <BotonConIcono onPress={()=>{setBuscando(true)}} icon={<Feather name="search" size={20} color="black" />}/>
          )
            
        }} />
          <Stack.Screen name="modalCap" options={{ presentation: 'modal' }} />
          <Stack.Screen name="modalLoc" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(127.5,127.5,127.5,0.5)",
    borderRadius: 35,
    alignItems: 'center',
    margin: 10,
    height:35,
    width:35,
    display:"flex",
    justifyContent:"center",
    alignContent:"center"
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

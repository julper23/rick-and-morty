import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider,useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useColorScheme, Button,TextInput, Alert,StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { SetStateAction, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from "./../store"
import { useSelector, useDispatch } from 'react-redux';
import { Feather,MaterialIcons  } from '@expo/vector-icons';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Provider store={store}>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </Provider>
  );
}

const buscarDatos =  (nombre: string) => {
  console.log(nombre);
  
}

function RootLayoutNav() {

  const colorScheme = useColorScheme();
  const [buscando,setBuscando] = useState(false);
  const [texto, setTexto] = useState('');

  const pagina = useSelector(state => state.pagina);
  const dispatch = useDispatch();

  useEffect(()=>{
    setBuscando(false)
    console.log(pagina);
    console.log("aaaaaa");
    
  },[pagina])


  const handleInputChange = (text: SetStateAction<string>) => {
    setTexto(text);
    console.log(text);
    
  };
  
  const buscar = () => {
    //dispatch({ type: 'UPDATE_PAGINA', payload: pagina===0?1:0 });
    dispatch({ type: 'UPDATE_BUSQUEDA_CAP', payload: texto });
  }

  const cancelarBuscar = () => {
    dispatch({ type: 'UPDATE_BUSQUEDA_CAP', payload: "" });
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
          headerTitle: () => (
            buscando?
            <View style={{height:35,width:150,backgroundColor:"rgba(0,0,0,0)"}}>
              <TextInput
              style={{
                flex: 1,
                height:30,
                paddingLeft:10,
                backgroundColor:"rgba(127.5,127.5,127.5,0.5)",
                borderRadius:10

              }}
              placeholder="Buscar..."
              onChangeText={handleInputChange}
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
          headerRight: () => (
            buscando?
              <View style={{backgroundColor:"rgba(0,0,0,0)",display:"flex",flexDirection:"row"}}>
                <BotonConIcono onPress={()=>{buscar()}} icon={<Feather name="search" size={20} color="black" />}/>
                <BotonConIcono onPress={()=>{cancelarBuscar()}} icon={<MaterialIcons name="cancel" size={20} color="black" />}/>
              </View>
            :
              <BotonConIcono onPress={()=>{setBuscando(true)}} icon={<Feather name="search" size={20} color="black" />}/>
          )
            
        }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
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

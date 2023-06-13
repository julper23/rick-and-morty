import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider,useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useColorScheme, Button,TextInput, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { SetStateAction, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from "./../store"
import { useSelector, useDispatch } from 'react-redux';

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
  const [buscando,setBuscando] = useState(true);
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
    console.log("a");
    console.log(pagina);
    dispatch({ type: 'UPDATE_PAGINA', payload: pagina===0?1:0 });
  }

  




  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ title:'Rick and Morty',headerShown:true,
          headerTitle: () => (
            buscando?
            <View style={{height:35,backgroundColor:"rgba(0,0,0,0)"}}>
              <TextInput
              style={{
                flex: 1,
                height:20,
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
          headerRight: () => (<>
            <Button
              onPress={() => buscar()}
              title="BUSCAR"
            />
            <Button
              onPress={() => setBuscando(!buscando)}
              title="Update count"
            />
          </>)
            
        }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}

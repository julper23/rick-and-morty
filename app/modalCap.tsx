import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { useEffect,useLayoutEffect  } from 'react';
import useInfoCaps from './../hooks/useInfoCaps'
import { FlatList, Pressable, TouchableOpacity,Image  } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function ModalScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { name, ruta } = route.params;

  const {infoCap,personajes}: {infoCap: any, personajes: any[]} = useInfoCaps(ruta)

  useEffect(()=>{
    console.log(name);
    console.log(ruta);
    
    
  },[name,ruta])

  useEffect(()=>{
    console.log(infoCap);
    console.log(personajes);
    
  },[infoCap,personajes])

  useLayoutEffect(() => {
    //Cambiamos el titulo de la pantalla
    navigation.setOptions({title: name});
  }, [navigation, name]);

  const ImagenCircular = ({ url }) => {
    return (
      <View style={styles.containerImg}>
        <Image
          style={styles.image}
          source={{ uri:url}}
        />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <ImagenCircular url={item.img} />
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{`${infoCap.num} : ${infoCap.name}`}</Text>
      <Text style={styles.fecha}>{infoCap.date}</Text>
      <Text style={styles.tituloCat}>Personajes</Text>


      {/*POR DISEÑAR*/}
      
      
      
      
      <FlatList
        data={personajes}
        renderItem={renderItem}
        style={{width:"100%"}}
        keyExtractor={(item,index) => index.toString()}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={true}
      />
      {/*POR CREAR*/}
      <Text style={styles.title}>------------------------------</Text>
    
      <Text style={styles.title}>"Comentarios</Text>
      <Text style={styles.title}>Formulario</Text>
      <Text style={styles.title}>Nombre</Text>
      <Text style={styles.title}>Correo</Text>
      <Text style={styles.title}>Comentario (max. 500 caracteres)</Text>
      <Text style={styles.title}>Boton enviar</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

ModalScreen.navigationOptions = ({ route }) => {
  const { name } = route.params;
  return {
    title: name, // Cambiar el título del header por el nombre recibido
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    width:"100%",
    padding:5
  },
  fecha: {
    fontSize: 15,
    width:"100%",
    padding:5
  },
  tituloCat: {
    marginTop:5,
    fontSize: 15,
    fontWeight: '800',
    width:"100%",
    padding:5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  containerImg: {
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  itemContainer: {
    padding: 5,
    width: 125,
    height: 150,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor:"rgb(0,0,0,0)",
    height: 80,
  },
  itemText: {
    textAlign: "center",
    backgroundColor:"rgb(0,0,0,0)",
    width: "100%",
    fontSize: 17,
    marginTop: 5, // Ajusta el espaciado entre la imagen y el texto
  }
});

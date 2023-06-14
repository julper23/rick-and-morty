import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { useEffect,useLayoutEffect, useState  } from 'react';
import useInfoCaps from './../hooks/useInfoCaps'
import { FlatList, Pressable, TouchableOpacity,Image, TextInput  } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function ModalScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { name, ruta } = route.params;
  const [nombre,setNombre] = useState("")
  const [correo,setCorreo] = useState("")
  const [comentario,setComentario] = useState("")
  const {infoCap,personajes}: {infoCap: any, personajes: any[]} = useInfoCaps(ruta)

  useEffect(()=>{
    console.log(name);
    console.log(ruta);
    
    
  },[name,ruta])
  useEffect(()=>{
    console.log(nombre);
    
    
  },[nombre])
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
          resizeMode='cover'
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

  const submitForm = () => {

  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{`${infoCap.num} : ${infoCap.name}`}</Text>
      <Text style={styles.fecha}>{infoCap.date}</Text>
      <Text style={styles.tituloCat}>Personajes</Text>
      <FlatList
        data={personajes}
        renderItem={renderItem}
        style={{width:"100%",maxHeight:200}}
        keyExtractor={(item,index) => index.toString()}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={true}
      />
      <Text style={styles.tituloCat}>Comentarios</Text>
      {/*POR DISEÑAR*/}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electronico"
        value={correo}
        onChangeText={text => setCorreo(text)}
      />
      <TextInput
        style={styles.inputMax}
        placeholder="Comentario (max. 500 caracteres)"
        value={comentario}
        maxLength={500}
        multiline
        onChangeText={text => setComentario(text)}
      />

      <TouchableOpacity style={styles.boton} onPress={submitForm}><Text style={styles.textBoton}>ENVIAR</Text></TouchableOpacity>

    </View>
  );
}

ModalScreen.navigationOptions = ({ route }) => {
  const { name } = route.params;
  // Cambiar el título del header por el nombre recibido
  return {
    title: name, 
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    marginTop: 5,
  },
  input: {    
    height:30,
    paddingLeft:10,
    marginTop:20,
    width:"90%",
    backgroundColor:"rgba(127.5,127.5,127.5,0.5)",
    borderRadius:10
  },
  inputMax:{
    marginTop:20,
    height: 120,
    width:"90%",
    borderWidth: 1,
    backgroundColor:"rgba(127.5,127.5,127.5,0.5)",
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius:10,
    textAlignVertical: 'top'
  },
  boton:{
    backgroundColor:"rgba(127.5,127.5,127.5,0.5)",
    height:30,
    width:125,
    borderRadius:15
  },
  textBoton:{
    fontSize:20,
    fontWeight:"bold",
    width:"100%",
    textAlign:"center"
  }
});

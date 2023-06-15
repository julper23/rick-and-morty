import { useLayoutEffect, useState  } from 'react';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import useInfoCaps from './../hooks/useInfoCaps';
import useComentario from './../hooks/useComentario';

import { Titulo } from '../components/Titulos';
import { Text, View } from '../components/Themed';
import { RenderItem } from '../components/RenderItemModal';

export default function ModalScreen() {

  const route = useRoute();
  const navigation = useNavigation();
  const { name, ruta } = route.params;

  const {crearComentario} = useComentario();
  const {infoCap,personajes}: {infoCap: any, personajes: any[]} = useInfoCaps(ruta);

  const [nombre,setNombre] = useState("");
  const [correo,setCorreo] = useState("");
  const [comentario,setComentario] = useState("");
  const [esCorreo, setEsCorreo] = useState(false);
  const [intentoEnv,setIntentoEnv] = useState(false);

  useLayoutEffect(() => {
    //Cambiamos el titulo del header
    navigation.setOptions({title: name});
  }, [navigation, name]);

  //Comprobacion del email
  const validateEmail = (text:string) => {
    setCorreo(text)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valido = emailRegex.test(text);
    setEsCorreo(valido);
  }

  const submitForm = () => {
    //Si un campo esta vacio o el correo no es valido no se envia el comentario
    if(esCorreo&&nombre.length>0&&correo.length>0&&comentario.length>0){
      crearComentario(nombre,correo,comentario)
      setNombre("")
      setCorreo("")
      setComentario("")
      setEsCorreo(false)
      setIntentoEnv(false)
    }else{
      setIntentoEnv(true)
    }
  }

  return (
    <View style={styles.container}>
      <Titulo type={1} texto={`${infoCap.num} : ${infoCap.name}`}/>
      <Titulo type={2} texto={infoCap.date}/>
      <Titulo type={3} texto={`Personajes (${personajes.length})`}/>
      <FlatList
        data={personajes}
        renderItem={RenderItem}
        style={{width:"100%",maxHeight:200}}
        keyExtractor={(item,index) => index.toString()}
        ListEmptyComponent={<Text style={{paddingLeft:5}}>No hay personajes</Text>}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={true}
      />
      {/*FORMULARIO*/}
      <Titulo type={3} texto={"Comentarios"}/>
      <TextInput
        style={intentoEnv?nombre.length>0?styles.input:styles.inputInvalido:styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        style={intentoEnv?esCorreo?styles.input:styles.inputInvalido:styles.input}
        placeholder="Correo electronico"
        value={correo}
        onChangeText={validateEmail}
      />
      <TextInput
        style={intentoEnv?comentario.length>0?styles.inputMax:styles.inputInvalidoMax:styles.inputMax}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {    
    height:30,
    paddingLeft:10,
    marginTop:20,
    width:"90%",
    borderWidth: 1,
    backgroundColor:"white",
    borderRadius:5
  },
  inputInvalido:{
    height:30,
    paddingLeft:10,
    marginTop:20,
    width:"90%",
    backgroundColor:"white",
    borderRadius:5,
    borderColor:"red",
    borderWidth:2
  },
  inputMax:{
    marginTop:20,
    height: 120,
    width:"90%",
    borderWidth: 1,
    backgroundColor:"white",
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius:5,
    textAlignVertical: 'top'
  },
  inputInvalidoMax:{
    marginTop:20,
    height: 120,
    width:"90%",
    borderWidth: 1,
    backgroundColor:"white",
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius:5,
    textAlignVertical: 'top',
    borderColor:"red"
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

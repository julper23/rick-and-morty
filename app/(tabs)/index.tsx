import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { TextInput, Button, FlatList } from 'react-native';
import { SetStateAction, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import useCapitulos from './../../hooks/useCapitulos'


export default function CapitulosScreen() {

  const [searchTerm, setSearchTerm] = useState('');
  const {caps,info,setPage} = useCapitulos("")

  
  const handleSearchInputChange = (text:string) => {
    setSearchTerm(text);
  };

  const handleSearch = () => {
    // Lógica de búsqueda aquí, puedes realizar una llamada a una API, procesar los datos, etc.
    console.log('Realizando búsqueda:', searchTerm);
  };


  const renderVacio = () => (
    <View >
      <Text>No hay datos</Text>
      <Button title='Refrescar'/>
    </View>
  )

  const masDatos = () => {
    console.log(info)
    if(info.next){
      const texto: string = info.next;
      const numPag = parseFloat(texto.substring("https://rickandmortyapi.com/api/episode/?page=".length));
      setPage(numPag)
      
    }
  }


  const renderItem = ({ item }) => (
    <View style={{width:"100%",padding:10}}>
      <Text style={{fontWeight:"100"}}>{item.episode}</Text>
      <Text style={{fontWeight:"600"}}>{item.name}</Text>
      <Text style={{fontWeight:"100"}}>{item.air_date}</Text>
    </View>
  );
  return (
    <View style={styles.container}>

    <FlatList
      data={caps?caps:[]}
      style={{width:"100%",height:"100%"}}
      renderItem={renderItem}
      keyExtractor={item => item.episode.toString()}
      onEndReached={masDatos}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'gray'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor:'green'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { TextInput, Button } from 'react-native';
import { SetStateAction, useState } from 'react';
import { Feather } from '@expo/vector-icons';

export default function CapitulosScreen() {

  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchInputChange = (text:string) => {
    setSearchTerm(text);
  };

  const handleSearch = () => {
    // Lógica de búsqueda aquí, puedes realizar una llamada a una API, procesar los datos, etc.
    console.log('Realizando búsqueda:', searchTerm);
  };

  return (
    <View style={styles.container}>
      <Button title="Buscar" onPress={handleSearch}/>
      <Feather name="search" size={24} color="black" />
      <TextInput
      value={searchTerm}
      onChangeText={handleSearchInputChange}
      placeholder="Buscar..."
      style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
      />
    <Button title="Buscar" onPress={handleSearch} />
    <Text style={styles.title}>Capítulos</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/capitulos.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'red'
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

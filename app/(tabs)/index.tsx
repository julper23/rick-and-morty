import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator  } from 'react-native';

import useCapitulos from './../../hooks/useCapitulos';

import { Text, View } from '../../components/Themed';

export default function CapitulosScreen() {

  const nombre = useSelector(state => state.busquedaCap);
  const {caps,info,getCaps,setName} = useCapitulos();
  const navigation = useNavigation();

  useEffect(()=>{setName(nombre)},[nombre])

  const navigateToDetails = (item) => {navigation.navigate('modalCap', { name: item.name, ruta: item.url });};

  const renderFooter = () => {
    return(!info?.next&&caps?.length>0?<View style={styles.footerContainer}>
      <Text>No hay mas datos</Text>
    </View>:<ActivityIndicator size="large" color="#0000ff"/>)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>navigateToDetails(item)} style={{width:"100%",padding:10}}>
      <Text style={{fontWeight:"100"}}>{item.episode}</Text>
      <Text style={{fontWeight:"600"}}>{item.name}</Text>
      <Text style={{fontWeight:"100"}}>{item.air_date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={caps?caps:[]}
        style={{width:"100%",height:"100%"}}
        renderItem={renderItem}
        keyExtractor={item => item.episode.toString()}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.2}
        onEndReached={getCaps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  footerContainer: {
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    padding:2
  }
});
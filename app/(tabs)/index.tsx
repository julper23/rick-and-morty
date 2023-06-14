import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { TextInput, Button, FlatList } from 'react-native';
import { SetStateAction, useEffect, useState } from 'react';
import store from "./../../store";
import useCapitulos from './../../hooks/useCapitulos'
import { useSelector, useDispatch } from 'react-redux';

export default function CapitulosScreen() {
  const nombre = useSelector(state => state.busquedaCap);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const {caps,info,masCaps,setName} = useCapitulos()

  useEffect(()=>{
    console.log(nombre);
    setName(nombre)
  },[nombre])


  const renderFooter = () => {
    return(!info?.next&&caps?.length>0?<View style={styles.footerContainer}>
      <Text>No hay mas datos</Text>
    </View>:<View/>)
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
        ListFooterComponent={renderFooter()}
        onEndReachedThreshold={0.2}
        onEndReached={masCaps}
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

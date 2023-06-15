import { StyleSheet,FlatList, TouchableOpacity } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useEffect } from 'react';
import useLocation from './../../hooks/useLocation'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function LocalizacionesScreen() {
  const nombre = useSelector(state => state.busquedaLoc);
  const {locs,info,setName,masLocs} = useLocation()
  const navigation = useNavigation();
  useEffect(()=>{
    setName(nombre)
  },[nombre])



  const navigateToDetails = (item) => {
    console.log(item);
    
    navigation.navigate('modalLoc', { name: item.name, ruta: item.url });
  };

  const renderFooter = () => {
    return(!info?.next&&locs?.length>0?<View style={styles.footerContainer}>
      <Text>No hay mas datos</Text>
    </View>:<View/>)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>navigateToDetails(item)} style={{width:"100%",padding:10}}>
      <Text style={{fontWeight:"100"}}>{item.type}</Text>
      <Text style={{fontWeight:"600"}}>{item.name}</Text>
      <Text style={{fontWeight:"100"}}>{item.dimension}</Text>
    </TouchableOpacity>
  );

 return (
    <View style={styles.container}>

      <FlatList
        data={locs?locs:[]}
        style={{width:"100%",height:"100%"}}
        renderItem={renderItem}
        keyExtractor={item => item.name.toString()}
        ListFooterComponent={renderFooter()}
        onEndReachedThreshold={0.2}
        onEndReached={masLocs}
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

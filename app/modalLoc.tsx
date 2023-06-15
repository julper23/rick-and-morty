import { useLayoutEffect } from 'react';
import { StyleSheet,FlatList } from 'react-native';
import { useRoute, useNavigation  } from '@react-navigation/native';

import useInfoLoc from './../hooks/useInfoLoc';

import { Titulo } from '../components/Titulos';
import { Text, View } from '../components/Themed';
import { RenderItem } from '../components/RenderItemModal';

export default function ModalScreen() {

  const route = useRoute();
  const navigation = useNavigation();
  const { name, ruta } = route.params;

  const {infoLoc,personajes}: {infoLoc: any, personajes: any[]} = useInfoLoc(ruta);

  useLayoutEffect(() => {
    //Cambiamos el titulo del header
    navigation.setOptions({title: name});
  }, [navigation, name]);

  return (
    <View style={styles.container}>
      <Titulo type={1} texto={infoLoc.name}/>
      <Titulo type={2} texto={infoLoc.dimension}/>
      <Titulo type={3} texto={`Habitantes (${personajes.length})`}/>
      <FlatList
        data={personajes}
        renderItem={RenderItem}
        style={{width:"100%",maxHeight:200}}
        keyExtractor={(item,index) => index.toString()}
        ListEmptyComponent={<Text style={{paddingLeft:5}}>No hay habitantes</Text>}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

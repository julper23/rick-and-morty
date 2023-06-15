import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';
import { ImagenCircular } from './ImagenCircular';

export function RenderItem({ item }) {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <ImagenCircular url={item.img} />
            </View>
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
      padding: 5,
      width: 125,
      height: 150,
      alignItems: "center",
    },
    imageContainer: {
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor:"rgba(0,0,0,0)",
      height: 80,
    },
    itemText: {
      textAlign: "center",
      backgroundColor:"rgba(0,0,0,0)",
      width: "100%",
      fontSize: 17,
      marginTop: 5,
    }
  });
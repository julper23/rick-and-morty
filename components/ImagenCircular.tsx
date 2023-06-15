import { StyleSheet, Image } from 'react-native';
import { View } from '../components/Themed';

export function ImagenCircular(props: any) {
    return (
        <View style={styles.containerImg}>
            <Image
            style={styles.image}
            source={{ uri:props.url}}
            resizeMode='cover'
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
    }
})
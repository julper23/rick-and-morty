import { StyleSheet } from 'react-native';

import { Text } from '../components/Themed';

export function Titulo(props: any) {
    const type = props.type
    return (
        <Text style={type===1?styles.titulo:type===2?styles.subTitulo:type===3?styles.tituloCat:styles.titulo}>
            {props.texto}
        </Text>
    );
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        width:"100%",
        padding:5
    },
    subTitulo: {
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
    }
})
import { Alert } from 'react-native';

export default function useComentario() {

    const crearComentario = (nombre:string,correo:string,comentario:string) => {

        const data = {
            name: nombre,
            mail: correo,
            coment: comentario
        }

        //Endpoint falso. jsonplaceholder es una API falsa gratuita que permite realizar pruebas
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {Alert.alert("Comentario publicado con exito")})
        .catch((error) => {console.error('Error al realizar la solicitud:', error);});
    }

    return {crearComentario}
}
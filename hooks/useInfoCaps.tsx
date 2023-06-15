import { useEffect, useState } from "react";

export default function useInfoCaps(url:string) {

    const [infoCap,setInfoCap] = useState({
        num:"",
        name:"",
        date:""
    })
    const [personajes,setPersonajes] = useState([])

    const getInfoCap = async() => {
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(async(data) => {
            setInfoCap({
                num:data.episode,
                name:data.name,
                date:data.air_date
            })
            getPersonajes(data.characters)
        })
        .catch(error => {console.error('Error al realizar la solicitud:', error);});
    }

    const getPersonajes = async (listaPersonajes) => {
        try {
          const personajes = await Promise.all(
            listaPersonajes.map(async (personaje) => {
              try {
                const response = await fetch(personaje);
                const data = await response.json();
      
                const persona = {
                  name: data.name,
                  img: data.image,
                };
      
                return persona;
              } catch (error) {
                console.error('Error al obtener los datos del personaje:', error);
                return null;
              }
            })
          );
            setPersonajes(personajes)
            console.log(personajes);
        } catch (error) {
            setPersonajes([])
          console.error('Error al realizar la solicitud:', error);
        }
      };

    useEffect(()=> {
        if(url){
            getInfoCap()
        }
        
    },[url])

    return {infoCap,personajes}
}
import { useEffect, useState } from "react";

export default function useInfoLoc(url:string) {

  const [infoLoc,setInfoLoc] = useState({
    name:"",
    dimension:""
  })

  const [personajes,setPersonajes] = useState([])

  //Conseguimos la informacion de la localizacion
  const getInfoLoc = async() => {
    fetch(url)
    .then(response => response.json())
    .then(async(data) => {
      setInfoLoc({
        name:data.name,
        dimension:data.dimension
      })
      getPersonajes(data.residents)
    })
    .catch(error => {console.error('Error al realizar la solicitud:', error);});
  }
  
  //Conseguimos los datos de los personajes
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
    } catch (error) {
      setPersonajes([])
      console.error('Error al realizar la solicitud:', error);
    }
  };

  useEffect(()=> {
    if(url){getInfoLoc()}
  },[url])

  return {infoLoc,personajes}
}
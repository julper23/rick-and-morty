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
            console.log(data);
            
            
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
      
                const x = {
                  name: data.name,
                  img: data.image,
                };
      
                return x;
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
    /*
    const getCaps = () => {
        fetch(ruta+`${caps.length===0?0:page}${"&name="+name}`)
        .then(response => response.json())
        .then(data => {
            if(caps.length===0){
                setPage(0)
                setCaps(data.results)
            }else{
                setCaps([...caps, ...data.results])
            }
            setInfo(data.info)
        })
        .catch(error => {console.error('Error al realizar la solicitud:', error);});
    }

    const getCapsNewName = () => {
        fetch(ruta+`0&name=${name}`)
        .then(response => response.json())
        .then(data => {
            setCaps(data.results)
            setInfo(data.info)
        })
        .catch(error => {console.error('Error al realizar la solicitud:', error);});
    }

    const masCaps = () => {
        if(info.next){
            const texto: string = info.next;
            const numPag = parseFloat(texto.substring(ruta.length));
            fetch(ruta+`${numPag}${"&name="+name}`)
            .then(response => response.json())
            .then(data => {
                setCaps([...caps, ...data.results])
                setInfo(data.info)
            })
            .catch(error => {console.error('Error al realizar la solicitud:', error);});
        }
    }

    //Si cambiamos el numero de pagina se actualizara la lista
    useEffect(()=>{getCaps()},[page])

    //Si se cambia el nombre se actualiza la lista
    useEffect(()=>{getCapsNewName()},[name])
*/

    return {infoCap,personajes}
}
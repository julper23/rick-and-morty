import { useEffect, useState } from "react";

export default function useCapitulos(name:string) {

    const [caps,setCaps] = useState([])
    const [info,setInfo] = useState({next:null})
    const [page,setPage] = useState(0)
    const getLocations = () => {
        
        fetch(`https://rickandmortyapi.com/api/episode/?page=${page}${name ? "&name="+name : "" }`)
        .then(response => response.json())
        .then(data => {
            if(caps.length===0){
                setCaps(data.results)
            }else{
                setCaps([...caps, ...data.results])
            }
            setInfo(data.info)
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
        
    }

    //Si cambiamos el numero de pagina se actualizara la lista
    useEffect(()=>{getLocations()},[page])

    //Si se cambia el nombre hay que empezar de 0 con la paginacion

    return {caps,info,setPage}
}
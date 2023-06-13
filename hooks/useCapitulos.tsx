import { useEffect, useState } from "react";

export default function useCapitulos(name:string) {

    const [caps,setCaps] = useState([])
    const [info,setInfo] = useState({next:null})
    const [page,setPage] = useState(0)
    const ruta = "https://rickandmortyapi.com/api/episode/?page="

    const getLocations = () => {
        
        fetch(ruta+`${page}${name ? "&name="+name : "" }`)
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

    const masCaps = () => {
        if(info.next){
          const texto: string = info.next;
          const numPag = parseFloat(texto.substring(ruta.length));
          setPage(numPag)
          
        }
    }

    //Si cambiamos el numero de pagina se actualizara la lista
    useEffect(()=>{getLocations()},[page])

    //Si se cambia el nombre hay que empezar de 0 con la paginacion

    return {caps,info,masCaps}
}
import { useEffect, useState } from "react";

export default function useCapitulos() {

    const [caps,setCaps] = useState([])
    const [info,setInfo] = useState({next:null})
    const [page,setPage] = useState(0)
    const [name,setName] = useState("")
    const ruta = "https://rickandmortyapi.com/api/episode/?page="

    const getCaps = () => {
        console.log("AQUI");
        
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
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
    }

    const getCapsNewName = () => {
        console.log("ENTRA");
        fetch(ruta+`0&name=${name}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            setCaps(data.results)
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
    useEffect(()=>{
        getCaps()
        console.log("a");
        
    },[page])

    //Si se cambia el nombre hay que empezar de 0 con la paginacion
    useEffect(()=>{
        console.log("b");
        
        getCapsNewName()
    },[name])

    return {caps,info,setName,masCaps}
}
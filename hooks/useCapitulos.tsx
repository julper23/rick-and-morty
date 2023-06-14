import { useEffect, useState } from "react";

export default function useCapitulos() {

    const [caps,setCaps] = useState([])
    const [info,setInfo] = useState({next:null})
    const [page,setPage] = useState(0)
    const [name,setName] = useState("")
    const ruta = "https://rickandmortyapi.com/api/episode/?page="

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

    return {caps,info,setName,masCaps}
}
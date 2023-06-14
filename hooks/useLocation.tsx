import { useEffect, useState } from "react";

export default function useLocation() {

    const [locs,setLocs] = useState([])
    const [info,setInfo] = useState({next:null})
    const [page,setPage] = useState(0)
    const [name,setName] = useState("")
    const ruta = "https://rickandmortyapi.com/api/location/?page="

    const getLocs = () => {
        
        fetch(ruta+`${locs.length===0?0:page}${"&name="+name}`)
        .then(response => response.json())
        .then(data => {
            if(locs.length===0){
                setPage(0)
                setLocs(data.results)
            }else{
                setLocs([...locs, ...data.results])
            }
            setInfo(data.info)
        })
        .catch(error => {console.error('Error al realizar la solicitud:', error);});
    }

    const getLocsNewName = () => {
        fetch(ruta+`0&name=${name}`)
        .then(response => response.json())
        .then(data => {
            setLocs(data.results)
            setInfo(data.info)
        })
        .catch(error => {console.error('Error al realizar la solicitud:', error);});
    }

    const masLocs = () => {
        if(info.next){
            const texto: string = info.next;
            const numPag = parseFloat(texto.substring(ruta.length));
            fetch(ruta+`${numPag}${"&name="+name}`)
            .then(response => response.json())
            .then(data => {
                setLocs([...locs, ...data.results])
                setInfo(data.info)
            })
            .catch(error => {console.error('Error al realizar la solicitud:', error);});
        }
    }

    //Si cambiamos el numero de pagina se actualizara la lista
    useEffect(()=>{getLocs()},[page])

    //Si se cambia el nombre se actualiza la lista
    useEffect(()=>{getLocsNewName()},[name])

    return {locs,info,setName,masLocs}
}
import { useEffect, useState } from "react";

export default function useLocation() {

    const [locs,setLocs] = useState([])
    const [info,setInfo] = useState({next:null})
    const [name,setName] = useState("")

    //Solo para cuando cambie el nombre (La primera vez)
    const getLocsNewName = () => {
        fetch(`https://rickandmortyapi.com/api/location/?page=0&name=${name}`)
        .then(response => response.json())
        .then(data => {
            setLocs(data.results)
            setInfo(data.info)
        })
        .catch(error => {console.error('Error al realizar la solicitud:', error);});
    }

    //Cuando llegamos al final de la lista si hacen falta mas datos
    const getLocs = () => {
        if(info.next){
            fetch(info.next)
            .then(response => response.json())
            .then(data => {
                setLocs([...locs, ...data.results])
                setInfo(data.info)
            })
            .catch(error => {console.error('Error al realizar la solicitud:', error);});
        }
    }

    //Si se cambia el nombre se actualiza la lista
    useEffect(()=>{getLocsNewName()},[name])

    return {locs,info,setName,getLocs}
}
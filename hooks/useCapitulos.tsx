import { useEffect, useState } from "react";

export default function useCapitulos() {

    const [caps,setCaps] = useState([])
    const [info,setInfo] = useState({next:null})
    const [name,setName] = useState("")

    const getCapsNewName = () => {
        fetch(`https://rickandmortyapi.com/api/episode/?page=0&name=${name}`)
        .then(response => response.json())
        .then(data => {
            setCaps(data.results)
            setInfo(data.info)
        })
        .catch(error => {console.error('Error al realizar la solicitud:', error);});
    }

    const getCaps = () => {
        if(info.next){
            fetch(info.next)
            .then(response => response.json())
            .then(data => {
                setCaps([...caps, ...data.results])
                setInfo(data.info)
            })
            .catch(error => {console.error('Error al realizar la solicitud:', error);});
        }
    }


    //Si se cambia el nombre se actualiza la lista
    useEffect(()=>{getCapsNewName()},[name])

    return {caps,info,setName,getCaps}
}
import { useEffect, useState } from "react";

export default function useLocation(page:number,name:string) {

    const [locations,setLocations] = useState()

    const getLocations = () => {
        
        `https://rickandmortyapi.com/api/location/?page=${page}${name ? "&name="+name : "" }`
        const response = "entra"





        setLocations(response)
    }


    useEffect(()=>{

        getLocations()

    },[page,name])


    return {locations}
}
"use client"
import {useCallback, useContext, useEffect, useState} from "react"
import {MapContext} from "@/app/map/[id]/mapProvider";
import {CircleLoader} from "react-spinners";
import {useParams} from "next/navigation";
import RenderMap from "@/app/map/[id]/renderMap";

export default function Page(){
    const params = useParams()
    const mapId = params.id

    const {map, setMap, setFields} = useContext(MapContext)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8080/maps/${mapId}/with-fields`);
            if (!response.ok) {
                setError(true)
            }
            const result = await response.json();
            setMap(result)
            setFields(result.fields)
        } catch (err) {
            console.log(err.message)
            setError(true);
        }}, []);

    useEffect(() => {
        fetchData();
        setLoading(false)
    }, []);

    if(map!==null){
        if(error){
            //TODO: route to a 404 error page
            return (<div>bad request</div>)
        }
        return(
            <div>
                <h1>Mapa: {map.name}</h1>
                <RenderMap/>
            </div>
        )
    }
   else return (
       <div>
           <CircleLoader />
           <p>Your world is loading...</p>
       </div>
    )
}
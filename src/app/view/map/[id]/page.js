"use client"
import {useCallback, useContext, useEffect, useState} from "react"
import {MapContext} from "@/app/map/[id]/mapProvider";
import {CircleLoader} from "react-spinners";
import {useParams, useRouter} from "next/navigation";
import RenderMap from "@/app/view/map/[id]/renderMap";



export default function Page(){
    const params = useParams()
    const mapId = params.id
    const router = useRouter()

    const {map, setMap, setFields} = useContext(MapContext)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    const fetchMap = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8080/maps/${mapId}/with-fields`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                }
            });
            if (!response.ok) {
                setError(true)
            }
            const result = await response.json();
            setMap(result)
            setFields(result.fields)
        } catch (err) {
            setError(true)
        }}, []);

    useEffect(() => {
        fetchMap()
        setLoading(false)
    }, []);

    if(error){
        router.push('/not-found.js');
    }
    if(map!==null){
        return(
            <div>
                <h1>Mapa: {map.name}</h1>
                <h2>{map.dimensionX} x {map.dimensionY}</h2>
                <RenderMap/>
            </div>
        )
    }
    else return (
        <div>
            <CircleLoader />
            <p>Ładowanie mapy...</p>
        </div>
    )
}
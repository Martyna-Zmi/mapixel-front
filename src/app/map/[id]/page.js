"use client"
import {useCallback, useContext, useEffect, useState} from "react"
import {MapContext} from "@/app/map/[id]/mapProvider";
import {CircleLoader} from "react-spinners";
import {useParams, useRouter} from "next/navigation";
import RenderMap from "@/app/map/[id]/renderMap";
import EditMap from "@/app/map/[id]/editMap";
import EditButton from "@/app/map/[id]/editButton";
import SaveButton from "@/app/map/[id]/saveButton";

export default function Page(){
    const params = useParams()
    const mapId = params.id
    const router = useRouter()

    const {map, setMap, setFields, setFieldCatalog, fieldCatalog, toolField, selectedField} = useContext(MapContext)
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

    const fetchFields = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8080/fields`,{
                method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                }
            })
            if (!response.ok) {
                setError(true)
            }
            const result = await response.json();
            setFieldCatalog(result)
        } catch (err) {
            setError(true);
        }}, [])

    useEffect(() => {
        fetchMap()
        fetchFields()
        setLoading(false)
    }, []);

    if(error){
        router.push('/not-found.js');
    }
    if(map!==null){
        return(
            <div>
                <h1>Mapa: {map.name}</h1>
                <h2>Obecny kafelek: {selectedField}</h2>
                <h2>Obecne narzędzie: {toolField}</h2>
                <EditButton/>
                <SaveButton/>
                <RenderMap/>
                <EditMap/>
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
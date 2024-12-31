"use client"
import {useCallback, useContext, useEffect, useState} from "react"
import {MapContext} from "@/app/map/[id]/mapProvider";
import {useParams, useRouter} from "next/navigation";
import RenderMap from "@/app/map/[id]/renderMap";
import EditMap from "@/app/map/[id]/editMap";
import EditButton from "@/app/map/[id]/editButton";
import SaveButton from "@/app/map/[id]/saveButton";
import LoadingMap from "@/app/utils/loadingMap";
import UndoButton from "@/app/map/[id]/undoButton";
import fetchMap from "@/app/utils/fetchMap";

export default function Page(){
    const params = useParams()
    const mapId = params.id
    const router = useRouter()

    const {map, setMap, setFields, setFieldCatalog, toolField, selectedField, unsavedChanges, setHistory} = useContext(MapContext)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

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
        setHistory([])
        fetchMap({mapId, setError, setMap, setFields})
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
                <p>{unsavedChanges? "Masz niezapisane zmiany. Pamiętaj o regularnym zapisaniu zmian, aby nie utracić swojej mapy": "Stan mapy jest aktualny"}</p>
                <h2>Obecny kafelek: {selectedField}</h2>
                <h2>Obecne narzędzie: {toolField}</h2>
                <EditButton/>
                <SaveButton/>
                <UndoButton/>
                <RenderMap/>
                <EditMap/>
            </div>
        )
    }
   else return (
       <LoadingMap/>
    )
}
"use client"
import {use, useCallback, useContext, useEffect, useState} from "react"
import {MapContext} from "@/app/map/[id]/mapProvider";
import {useParams, useRouter} from "next/navigation";
import RenderMap from "@/app/map/[id]/renderMap";
import EditMap from "@/app/map/[id]/editMap";
import EditButton from "@/app/map/[id]/editButton";
import SaveButton from "@/app/map/[id]/saveButton";
import LoadingMap from "@/app/utils/loadingMap";
import UndoButton from "@/app/map/[id]/undoButton";
import fetchMap from "@/app/utils/fetchMap";
import VerifyMap from "@/app/map/[id]/verifyMap";
import PreviewButton from "@/app/map/[id]/previewButton";

export default function Page(){
    const params = useParams()
    const mapId = params.id
    const router = useRouter()

    const {map, setMap, setFields, setFieldCatalog, toolField, selectedField, unsavedChanges, setHistory} = useContext(MapContext)
    const [mapLoading, setMapLoading] = useState(true);
    const [fieldLoading, setFieldLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchFields = async () => {
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
        }}

    useEffect(() => {
        setMap(null)
        setFields([])
        setHistory([])
        fetchMap({mapId, setError, setMap, setFields}).then(()=>setMapLoading(false))
        fetchFields().then(() => setFieldLoading(false))

    }, []);

    if(error){
        router.push('/not-found.js');
    }
    if(!mapLoading && map!==null && !fieldLoading){
        return(
            <div>
                <div>
                    <h1 className="text-center font-bold text-2xl">
                        {map.name}
                    </h1>
                    <p className={unsavedChanges? "text-center text-red-900 font-semibold": "text-center text-gray-700"}>
                        {unsavedChanges ? "Masz niezapisane zmiany. Pamiętaj o regularnym zapisaniu zmian, aby nie utracić swojej mapy!" : "Stan mapy jest aktualny"}
                    </p>
                    <div className="flex flex-row justify-center pt-3">
                        <SaveButton/>
                        <UndoButton/>
                    </div>

                </div>
                <div className="flex">
                    <div>
                        <EditMap/>
                        <EditButton/>
                        <PreviewButton/>
                    </div>
                    <RenderMap/>
                    <VerifyMap/>
                </div>


            </div>
        )
    } else return (
        <LoadingMap/>
    )
}
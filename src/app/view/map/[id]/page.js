"use client"
import {useCallback, useContext, useEffect, useState} from "react"
import {MapContext} from "@/app/map/[id]/mapProvider";
import {CircleLoader} from "react-spinners";
import {useParams, useRouter} from "next/navigation";
import RenderMap from "@/app/view/map/[id]/renderMap";
import LoadingMap from "@/app/utils/loadingMap";
import fetchMap from "@/app/utils/fetchMap";

export default function Page(){
    const params = useParams()
    const mapId = params.id
    const router = useRouter()

    const {map, setMap, setFields} = useContext(MapContext)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)


    useEffect(() => {
        fetchMap({mapId, setError, setMap, setFields})
        setLoading(false)
    }, []);

    if(error){
        router.push('/not-found.js');
    }
    if(map!==null){
        return(
            <div>
                <h1 className="font-semibold text-2xl text-center">{map.name}</h1>
                <div className="flex flex-row justify-center">
                    <RenderMap/>
                </div>
            </div>
        )
    }
    else return (
        <LoadingMap/>
    )
}
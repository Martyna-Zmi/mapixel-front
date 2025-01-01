"use client"
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import LoadingMap from "@/app/utils/loadingMap";
import RenderMapList from "@/app/panel/[id]/renderMapList";

export default function Page(){
    const params = useParams()
    const userId = params.id
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true)
    const [maps, setMaps] = useState([])

    async function fetchUserMaps(id) {
        try {
            const response = await fetch(`http://localhost:8080/maps/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                }
            });
            if (!response.ok) {
                router.push("/not-found")
            }
            setMaps(await response.json())
        } catch (err) {
            router.push("/not-found")
        }
    }

    useEffect(() => {
        fetchUserMaps(userId).then(()=> setIsLoading(false))
    }, []);
    if(isLoading){
        return (
            <LoadingMap/>
        )
    }
    return(
        <>
            <RenderMapList maps={maps}/>
        </>
    )
}
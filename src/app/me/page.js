"use client"
import fetchUserId from "@/app/utils/fetchUserId";
import {useRouter} from "next/navigation";
import {useEffect, useLayoutEffect, useState} from "react";
import CreateButton from "@/app/main/createButton";
import RenderAllMaps from "@/app/me/renderAllMaps";
import Link from "next/link";
import LoadingScreen from "@/app/utils/loadingScreen";

export default function Page() {
    const router = useRouter()
    const [userWithMaps, setUserWithMaps] = useState()
    const [deleted, setDeleted] = useState("")
    const [message, setMessage] = useState("")

    useLayoutEffect(() => {
        if (deleted!=="") {
            window.scrollTo(0, 0);
            setMessage(`Mapa ${deleted} została usunięta`);
        }
    }, [deleted])

    useEffect(() => {
        async function fetchUserMaps() {
            const userId = await fetchUserId(router)
            try {
                const response = await fetch(`http://localhost:8080/users/${userId}/with-maps`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                    }
                });
                if (response.ok) {
                    return await response.json();
                }
                else {
                    router.push('/login')
                }
            } catch (error) {
                router.push('/login')
            }
        }
        async function setUser(){
            setUserWithMaps(await fetchUserMaps())
        }
        setUser()
    }, []);

    if(userWithMaps!==undefined){
        return(
            <>
                <h1>Cześć, {userWithMaps.username}</h1>
                <p>{message}</p>
                <p>Oto twoje mapy</p>
                <p>{userWithMaps.maps.length===0? "Hmmm. trochę tu pusto...": ""}</p>
                <RenderAllMaps setDeleted={setDeleted} setUserWithMaps={setUserWithMaps} maps={userWithMaps.maps} userWithMaps={userWithMaps}/>
                <CreateButton/>
                <Link className="text-green-800 font-bold underline block" href="/main">Powrót do strony głównej</Link>
            </>
        )
    }
    return (
        <LoadingScreen/>
    )
}
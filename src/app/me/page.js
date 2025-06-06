"use client"
import fetchUserId from "@/app/utils/fetchUserId";
import {useRouter} from "next/navigation";
import {useEffect, useLayoutEffect, useState} from "react";
import CreateButton from "@/app/main/createButton";
import RenderAllMaps from "@/app/me/renderAllMaps";
import Link from "next/link";
import LoadingScreen from "@/app/utils/loadingScreen";
import ChangePassword from "@/app/me/changePassword";

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
            <div>
                <h1 className="font-semibold text-2xl text-center">Cześć, {userWithMaps.username}</h1>
                <div className="flex flex-row justify-center">
                    <Link className="text-green-800 font-bold underline block" href="/main">
                        Powrót do strony głównej
                    </Link>
                </div>
                <p className="text-center text-green-900 italic">{message}</p>
                <p className="text-center font-semibold p-3">Oto twoje mapy:</p>
                <p className="text-center text-green-900">{userWithMaps.maps.length === 0 ? "Hmmm... trochę tu pusto!" : ""}</p>
                <RenderAllMaps setDeleted={setDeleted} setUserWithMaps={setUserWithMaps} maps={userWithMaps.maps}
                               userWithMaps={userWithMaps}
                />
                <h2 className="text-center">Zarządzanie kontem:</h2>
                <ChangePassword/>

            </div>
        )
    }
    return (
        <LoadingScreen/>
    )
}
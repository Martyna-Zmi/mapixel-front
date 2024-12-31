"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import CreateButton from "@/app/main/createButton";
import ViewMapsButton from "@/app/main/viewMapsButton";
import LoadingScreen from "@/app/utils/loadingScreen";

export default function Page(){
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function fetchThymeleafPage() {
            try {
                const response = await fetch(`http://localhost:8080/main-page`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                        }
                    }
                );
                if (!response.ok) {
                    router.push('/login')
                }
                document.getElementById('thymeleaf-content').innerHTML = await response.text();
            } catch (error) {
                router.push('/login')
            }
        }
        fetchThymeleafPage();
        setLoading(false)
    }, []);

    if(loading){
        return (
            <LoadingScreen/>
        )
    }
    return (
        <div className="flex-col justify-center items-center text-center">
            <h1 className="font-semibold m-5">Mapixel - stwórz własne, unikalne światy, w pixelowym stylu!</h1>
            <div>
                <CreateButton/>
                <ViewMapsButton/>
            </div>
            <div id="thymeleaf-content"></div>
        </div>
    );
};
"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

export default function Page(){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchThymeleafPage = async () => {
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
        };
        fetchThymeleafPage();
        setLoading(false)
    }, []);

    if(loading){
        return (
            <h2>Ładowanie...</h2>
        )
    }
    if(error){
        router.push('/not-found.js');
    }
    return (
        <div>
            <h1>Mapixel - stwórz własne, unikalne światy, w pixelowym stylu!</h1>
            <div id="thymeleaf-content"></div>
        </div>
    );
};
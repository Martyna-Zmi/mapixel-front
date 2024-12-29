"use client"
import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";

export default function Page(){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const params = useParams()
    const id = params.id

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
                    setError(true)
                }
                document.getElementById('thymeleaf-content').innerHTML = await response.text();
            } catch (error) {
                setError(true)
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
        return (
            <>
                <p>error!</p>
            </>
        )
    }
    return (
        <div>
            <h1>React-Thymeleaf Hybrid Page</h1>
            <div id="thymeleaf-content"></div>
        </div>
    );
};
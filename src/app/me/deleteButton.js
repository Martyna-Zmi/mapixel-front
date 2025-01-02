"use client"
import {useState} from "react";

export default function DeleteButton({map, setUserWithMaps, userWithMaps, setDeleted}){
    const [error, setError] = useState("")
    async function handleClick() {
        try {
            const response = await fetch(`http://localhost:8080/maps/${map.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
                }
            })
            if (response.ok) {
                console.log(userWithMaps.maps.filter(element=>element.id!==map.id))
                setUserWithMaps({...userWithMaps, maps: userWithMaps.maps.filter(element=>element.id!==map.id)})
                setDeleted(map.name)
            } else {
                setError("Wygląda na to, że mapa którą próbujesz usunąć już nie istnieje... gratulacje")
            }
        } catch (error) {
            setError("Błąd przy łączeniu z serwerem, odśwież stronę i spróbuj ponownie")
        }
    }
    return(
        <>
            <button
                onClick={handleClick}
                className="text-white hover:bg-purple-700 bg-teal-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Usuń mapę
            </button>
            <p>{error}</p>
        </>
    )
}
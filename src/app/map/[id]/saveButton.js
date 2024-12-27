import {useContext, useState} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";

export default function SaveButton(){
    const {fields, map, setMap} = useContext(MapContext)
    const [error, setError] = useState(false)
    let errorMessage = ""

    async function handleClick() {
        const fieldsIds = fields.map(field => field.id);
        const updatedMap = { ...map, fields: fieldsIds };
        setMap(updatedMap);
        fetchSaveMap(updatedMap);
        alert("Zapisano stan mapy")
    }

    const fetchSaveMap = async (updatedMap) => {
        try {
            const response = await fetch(`http://localhost:8080/maps`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedMap),
            });
            if (!response.ok) {
                setError(true);
                console.log(await response.json());
            }
        } catch (err) {
            errorMessage = err.message;
            setError(true);
        }
    }
    if(error){
        return (
            <>
                <p>Nie udało się zapisać mapy</p>
                <button type="button"
                        onClick={handleClick}
                        className="text-white hover:bg-red-500 bg-red-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Spróbuj zapisać ponownie
                </button>
            </>
        )
    }
    return (
        <>
            <button type="button"
                    onClick={handleClick}
                    className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Zapisz zmiany
            </button>
        </>
    )
}
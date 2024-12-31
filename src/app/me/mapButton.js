import {useRouter} from "next/navigation";

export default function MapButton({map}){
    const router = useRouter()
    function handleClick(){
        router.push(`/map/${map.id}`)
    }
    return(
        <div>
            <h3>{map.name}</h3>
            <p>{map.dimensionX} x {map.dimensionY}</p>
            <button
                onClick={handleClick}
                className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Wyświetl mapę
            </button>
        </div>
    )
}
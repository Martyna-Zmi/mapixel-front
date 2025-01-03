import {useRouter} from "next/navigation";

export default function ViewMapsButton(){
    const router = useRouter()

    function handleClick(){
        router.push("/me")
    }
    return (
        <button type="button"
                onClick={handleClick}
                className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Wyświetl swój profil i mapy
        </button>
    )
}
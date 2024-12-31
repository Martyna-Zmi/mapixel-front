import {useRouter} from "next/navigation";

export default function CreateButton(){
    const router = useRouter()

    function handleClink(){
        router.push("/create")
    }

    return(
        <button
            onClick={handleClink}
            className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Stwórz nową mapę
        </button>
    )
}
import {useContext} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";

export default function PreviewButton(){
    const {map} = useContext(MapContext)

    function handleClick() {
        const url = `http://localhost:3000/view/map/${map.id}`
        window.open(url, '_blank', 'noopener,noreferrer')
    }
    return(
        <>
            <div className="flex flex-row justify-center pt-2">
                <button type="button"
                        onClick={handleClick}
                        className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Podgląd
                </button>
            </div>
            <p className="text-center underline">Aby podgląd działał prawidłowo, zapisz mapę</p>
            <p className="text-center">Możesz udostępnić link do podglądu</p>
            <p className="text-center">aby w łatwy sposób podzielić się swoją mapą!</p>
        </>

    )
}
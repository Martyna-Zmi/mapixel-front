import {useContext} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";

export default function UndoButton(){
    const {history, setHistory, setFields, unsavedChanges, setUnsavedChanges, fields} = useContext(MapContext)

    function handleClick(){
        if(history.length!==0){
            const previousField = history[history.length-1]
            let tempHistory = [...history]
            tempHistory.pop()
            setHistory(tempHistory)

            const updatedFields = [...fields]
            updatedFields[previousField.index] = previousField.previous

            setFields(updatedFields)
            if(!unsavedChanges) setUnsavedChanges(true)
        }
    }

    return(
        <>
            <button type="button"
                    onClick={handleClick}
                    className={history.length===0?
                        "text-white bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2":
                        "text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"}>
                Cofnij
            </button>
        </>
    )
}
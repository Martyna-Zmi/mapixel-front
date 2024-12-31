import {useContext} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";

export default function EditButton(){
    const {toolField, selectedField, fields, setFields, fieldCatalog, unsavedChanges, setUnsavedChanges, history, setHistory} = useContext(MapContext)

    function handleClick() {
        const fieldToolObject = fieldCatalog[toolField]
        const previousField = fields[selectedField]

        if(history===[]) setHistory([{previous: previousField, index: selectedField}])
        else setHistory([...history,{previous: previousField, index: selectedField}])

        const updatedFields = [...fields]
        updatedFields[selectedField] = fieldToolObject

        setFields(updatedFields)
        if(!unsavedChanges) setUnsavedChanges(true)

    }
    return(
        <>
            <button type="button"
                    onClick={handleClick}
                    className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Wypełnij pole
            </button>
        </>
    )
}
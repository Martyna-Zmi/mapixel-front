import {useContext} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";

export default function EditButton(){ //edit button with logic
    const {toolField, selectedField, fields, setFields, fieldCatalog, unsavedChanges, setUnsavedChanges} = useContext(MapContext)

    function handleClick() {
        const fieldToolObject = fieldCatalog[toolField]

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
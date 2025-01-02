"use client"
import {useContext, useMemo} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";
import EditOption from "@/app/map/[id]/editOption";
import CategorySelect from "@/app/map/[id]/categorySelect";

export default function EditMap(){
    const {fieldCatalog, category} = useContext(MapContext)

    const filteredFields = useMemo(()=>{
        return [...fieldCatalog].filter(field=>field.category===category)
    },[category])
    return(
        <div className="toolbox">
            <CategorySelect/>
            <div className="bg-gray-50 px-2 w-fit grid grid-cols-7">
                {filteredFields.map((element, key) => {
                    return(
                        <div key={key} className="p-0 m-0 inline-block w-fit h-fit">
                            <EditOption element={element} index={key}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
"use client"

import {useContext, useEffect, useState} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";

export default function EditOption({element, index}){
    const {toolField, setToolField, fieldCatalog, category} = useContext(MapContext)
    const [isClicked, setIsClicked] = useState(false)

    function handleClick(){
        setIsClicked(true)
        const indexOfField = fieldCatalog.findIndex(field=>field.id===element.id)
        setToolField(indexOfField)
    }
    useEffect(() => {
        if(toolField !== fieldCatalog.findIndex(field=>field.id===element.id)){
            setIsClicked(false)
        }
    }, [toolField])
    useEffect(() => {
        if(index===0) handleClick()
    }, [category]);
    return(
        <div>
            <img onClick={handleClick}
                 alt="field edit option"
                 width="55px"
                 height="55px"
                 className={isClicked ? 'clicked' : ''}
                 src={`/fields/${element.imgSrc}.png`}/>
        </div>
    )
}
"use client"

import {useContext, useEffect, useState} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";

export default function RenderOption({element, index}){
    const {toolField, setToolField} = useContext(MapContext)
    const [isClicked, setIsClicked] = useState(false)

    function handleClick(){
        setIsClicked(true);
        setToolField(index)
    }
    useEffect(() => {
        if(toolField !== index){
            setIsClicked(false)
        }
    }, [toolField])

    useEffect(() => {
        if(index === 0){
            setIsClicked(true)
        }
    }, [])

    return(
        <>
            <h4>{element.name}</h4>
            <img onClick={handleClick}
                 alt="field edit option"
                 width="75px"
                 height="75px"
                 className={isClicked ? 'clicked' : ''}
                 src={`/fields/${element.imgSrc}.png`}/>
        </>
    )
}
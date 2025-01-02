"use client"

import {useContext, useEffect, useState} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";
import './map.css';

export default function RenderField({element, index}){
    const {selectedField, setSelectedField} = useContext(MapContext)
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        setIsClicked(true);
        setSelectedField(index)
    }

    useEffect(() => {
        if(selectedField !== index){
            setIsClicked(false)
        }
    }, [selectedField])

    useEffect(() => {
        if(index === 0){
            setIsClicked(true)
        }
    }, [])

    return(
        <>
            <img onClick={handleClick}
                 alt="map field"
                 width="75px"
                 height="75px"
                 className={isClicked ? 'clicked' : ''}
                 src={`/fields/${element.imgSrc}.png`}/>
        </>
    )
}
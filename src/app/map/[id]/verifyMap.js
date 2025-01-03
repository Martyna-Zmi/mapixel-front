"use client"
import {useContext, useEffect, useState} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";
import {FaCircleCheck} from "react-icons/fa6";

export default function VerifyMap(){
    const {fields} = useContext(MapContext)
    const [spawn, setSpawn] = useState(false)
    const [chest, setChest] = useState(false)
    const [animal, setAnimal] = useState(false)
    const [water, setWater] = useState(false)
    const [campfire, setCampfire] = useState(false)

    useEffect(() => {
        verify()
    }, [fields]);

    function verify(){
        const spawnNumber = fields.filter(field=>field.name==="spawn").length
        setSpawn(spawnNumber>0)
        setChest(fields.filter(field=>field.name==="chest").length>=spawnNumber && fields.filter(field=>field.name==="chest").length>=1)
        setAnimal(fields.filter(field=>field.category==="animal").length>=spawnNumber && fields.filter(field=>field.category==="animal").length>=1)
        setWater(fields.filter(field=>field.name==="water").length>=spawnNumber && fields.filter(field=>field.name==="water").length>=1)
        setCampfire(fields.filter(field=>field.name==="campfire").length>=spawnNumber && fields.filter(field=>field.name==="campfire").length>=1)
    }
    function DisplayCheck({boolValue}){
        return boolValue? <FaCircleCheck size={20}/>: ""
    }

    return(
        <div className="pl-6">
            <p className="font-semibold">Na każdy spawn powinny przypadać:</p>
            <div className="flex flex-row">
                <div className="pt-1.5">
                    <DisplayCheck boolValue={chest}/>
                </div>
                <p className="px-3 py-1">Skrzynia</p>
            </div>
            <div className="flex flex-row">
                <div className="pt-1.5">
                    <DisplayCheck boolValue={animal}/>
                </div>
                <p className="px-3 py-1">Zwierzę</p>
            </div>
            <div className="flex flex-row">
                <div className="pt-1.5">
                    <DisplayCheck boolValue={water}/>
                </div>
                <p className="px-3 py-1">Czysta woda</p>
            </div>
            <div className="flex flex-row">
                <div className="pt-1.5">
                    <DisplayCheck boolValue={campfire}/>
                </div>
                <p className="px-3 py-1">Ognisko</p>
            </div>
        </div>
    )
}
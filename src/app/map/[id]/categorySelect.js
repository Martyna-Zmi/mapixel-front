"use client"
import {useContext} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";

export default function CategorySelect(){
    const {setCategory} = useContext(MapContext)
    function handleSelect(category){
        setCategory(category)
    }
    return(
        <div className="w-fit ml-2">
            <button className="rounded-tl-xl rounded-bl-xl bg-green-400 py-3 px-5 hover:bg-green-300" onClick={()=> handleSelect("terrain")}>
                Teren
            </button>
            <button className="bg-green-400 p-3 hover:bg-green-300" onClick={()=> handleSelect("obstacle")}>
                Przeszkody
            </button>
            <button className="bg-green-400 p-3 hover:bg-green-300" onClick={()=> handleSelect("animal")}>
                Zwierzęta
            </button>
            <button className="rounded-tr-xl -xl bg-green-400 p-3 hover:bg-green-300" onClick={()=> handleSelect("gameplay")}>
                Rozgrywka
            </button>
        </div>
    )
}
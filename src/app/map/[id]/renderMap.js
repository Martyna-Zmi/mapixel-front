"use client"

import {useContext} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";
import RenderField from "@/app/map/[id]/renderField";

export default function RenderMap(){
    const {map, fields} = useContext(MapContext)
    const mapGrid = {
        display: "grid",
        gridTemplateColumns: `repeat(${map.dimensionX}, 75px)`,
        gridTemplateRows: `repeat(map.${map.dimensionY}, 75px)`,
        gridRowGap: 0,
        gridColumnGap: 0,
        gap: 0
    }
    return (
        <div className="map-container">
            <div style={mapGrid}>
                {fields.map((element, key) => {
                    return (
                        <div key={key} id={key} className="p-0 m-0 inline-block w-fit h-fit">
                            <RenderField element={element} index={key}/>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
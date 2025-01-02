"use client"

import {useContext} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";
import RenderField from "@/app/view/map/[id]/renderField";
import ShareButton from "@/app/view/map/[id]/shareButton";


export default function RenderMap(){
    const {map, fields} = useContext(MapContext)
    const mapGrid = {
        display: "grid",
        gridTemplateColumns: `repeat(${map.dimensionX}, 60px)`,
        gridTemplateRows: `repeat(map.${map.dimensionY}, 60px)`,
        gridRowGap: 0,
        gridColumnGap: 0,
        gap: 0,
        padding:"4px"
    }
    return (
        <div className="flex flex-col content-center">
            <ShareButton/>
            <div id="map-container" style={mapGrid}>
                {fields.map((element, key) => {
                    return (
                        <div key={key} id={key} style={{
                            padding: 0,
                            margin: 0,
                            display: "inlinineBlock",
                            width: "fitContent",
                            height: "fitContent"
                        }}>
                            <RenderField element={element} index={key}/>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
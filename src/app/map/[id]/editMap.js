import {useContext} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";
import RenderOption from "@/app/map/[id]/editOption";

export default function EditMap(){
    const {fieldCatalog} = useContext(MapContext)

    return(
        <div>
            {fieldCatalog.map((element, key) => {
                return(
                    <div key={key} id={key} style={{padding:0, margin:0, display: "inlinineBlock", width: "fitContent", height: "fitContent"}}>
                        <RenderOption element={element} index={key}/>
                    </div>
                )
            })}
        </div>
    )
}
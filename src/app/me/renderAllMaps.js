import MapButton from "@/app/me/mapButton";
import DeleteButton from "@/app/me/deleteButton";

export default function RenderAllMaps({maps, setUserWithMaps, userWithMaps, setDeleted}){
    if(maps.length!==0){
        return(
            <div>
                {maps.map((map, key) => {
                    return (
                        <div key={key} id={key}>
                            <MapButton map={map}/>
                            <DeleteButton setDeleted={setDeleted} setUserWithMaps={setUserWithMaps} userWithMaps={userWithMaps} map={map}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}
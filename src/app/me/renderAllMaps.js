import MapButton from "@/app/me/mapButton";
import DeleteButton from "@/app/me/deleteButton";

export default function RenderAllMaps({maps, setUserWithMaps, userWithMaps, setDeleted}){
    if(maps.length!==0){
        return(
            <div className="flex flex-row justify-center">
                {maps.map((map, key) => {
                    return (
                        <div className="flex flex-col justify-center bg-green-100 border-2 border-green-300 p-4 rounded" key={key} id={key}>
                            <MapButton map={map}/>
                            <DeleteButton setDeleted={setDeleted} setUserWithMaps={setUserWithMaps} userWithMaps={userWithMaps} map={map}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}
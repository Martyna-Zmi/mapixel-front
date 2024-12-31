import {CircleLoader} from "react-spinners";

export default function (){
    return (
        <>
            <div className="flex text-center justify-center pt-20">
                <CircleLoader color="#529a70" size={120}/>
            </div>
            <div className="text-center">
                <h3 className="font-bold py-7">Trwa ładowanie mapy</h3>
            </div>
        </>

    )
}
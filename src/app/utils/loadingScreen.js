import {DotLoader} from "react-spinners";

export default function LoadingScreen(){
    return(
        <div className="flex text-center justify-center pt-56">
            <DotLoader color="#529a70" size={60}/>
            <h3>Trwa ładowanie</h3>
        </div>
    )
}
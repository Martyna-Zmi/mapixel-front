"use client"
import * as htmlToImage from "html-to-image"
import download from "downloadjs"
import {useContext} from "react";
import {MapContext} from "@/app/map/[id]/mapProvider";

export default function ShareButton(){
    const {map} = useContext(MapContext)

    function handleClick() {
        htmlToImage.toPng(document.getElementById('map-container'))
            .then(function (dataUrl) {
                download(dataUrl, `${map.name}-mapixel`);
            });
    }
    return(
        <div className="flex flex-row justify-center pt-2">
            <button type="button"
                    onClick={handleClick}
                    className="text-white hover:bg-green-600 bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Pobierz
            </button>
        </div>
    )
}
"use client"


export default function RenderField({element}){
    return(
        <>
            <img
                 alt="map field"
                 width="75px"
                 height="75px"
                 src={`/fields/${element.imgSrc}.png`}/>
        </>
    )
}
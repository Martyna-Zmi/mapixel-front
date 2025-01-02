"use client"


export default function RenderField({element}){
    return(
        <>
            <img
                 alt="map field"
                 width="60px"
                 height="60px"
                 src={`/fields/${element.imgSrc}.png`}/>
        </>
    )
}
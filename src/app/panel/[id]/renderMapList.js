import Link from "next/link";

export default function RenderMapList({maps}){
    return(
        <>
            <h1>Lista map</h1>
            {maps.map((map, key) => {
                return (
                    <div key={key} id={key}>
                        <p>{map.name}</p>
                        <p>{map.dimensionX} x {map.dimensionY}</p>
                        <p>Id mapy: {map.id}</p>
                        <Link href={`/view/map/${map.id}`}>Wyświetl mapę</Link>
                    </div>
                )
            })}
        </>
    )
}
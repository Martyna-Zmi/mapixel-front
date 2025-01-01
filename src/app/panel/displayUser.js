import Link from "next/link";

export default function DisplayUser({user}){
    return(
        <>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>ilość map: {user.maps.length}</p>
            <Link href={`/panel/${user.id}`}>Wyświetl mapy użytkownika</Link>
        </>
    )
}
export default function DisplayUser({user}){
    return(
        <>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>ilość map: {user.maps.length}</p>
        </>
    )
}
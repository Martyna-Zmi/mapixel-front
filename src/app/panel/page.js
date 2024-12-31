"use client"
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import LoadingScreen from "@/app/utils/loadingScreen";
import fetchUsers from "@/app/panel/fetchUsers";
import DisplayUser from "@/app/panel/displayUser";

export default function Page(){
    const router = useRouter()
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedUsers = await fetchUsers({router,username});
            setUsers(fetchedUsers);
        } catch (err) {
            console.log(err.message)
            setError('Error fetching users. Please try again.');
        } finally {
            setLoading(false);
        }
    }
    if(!loading){
        return (
            <div>
                <h1>Panel Administratora</h1>
                <div id="search">
                    <h2>Znajdź użytkownika</h2>
                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                        <button onClick={handleSearch} disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    {error && <p style={{color: 'red'}}>{error}</p>}

                        {users.map((user, key) => (
                            <div key={key}>
                            <DisplayUser user={user}/>
                            </div>
                        ))}
                </div>
            </div>

        );
    }
    return (
        <LoadingScreen/>
    )
}


// "use client"
// import {useEffect, useState} from "react";
// import {useRouter} from "next/navigation";
// import LoadingScreen from "@/app/utils/loadingScreen";
// import RenderUsers from "@/app/panel/renderUsers";
//
// export default function Page() {
//     const router = useRouter()
//     const [currentPage, setCurrentPage] = useState(1)
//     const [totalPages, setTotalPages] = useState(10)
//     const [users, setUsers] = useState()
//     function onNext(){
//         if(currentPage!==totalPages){
//             setCurrentPage(currentPage+1)
//         }
//     }
//     useEffect(() => {
//         const fetchUsers = async (page, size) => {
//             try {
//                 const response = await fetch(`http://localhost:8080/users?page=${page}&size=${size}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
//                     },
//                 })
//                 if (response.ok) {
//                     const data = await response.json()
//                     setUsers(data.content)
//                     setTotalPages(data.totalPages)
//                     setCurrentPage(data.currentPage)
//                 } else {
//                     router.push("/main")
//                 }
//             } catch (error) {
//                 router.push("/main")
//             }
//         }
//         fetchUsers(currentPage, 10)
//     }, []);
//     if (users !== undefined) {
//         return (
//             <div>
//                 <h1>Witaj w panelu administratora!</h1>
//                 <RenderUsers users={users}/>
//                 <p>Strona {currentPage} z {totalPages}</p>
//                 <button
//                     onClick={onNext}
//                     className={totalPages===currentPage? "bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2":
//                         "bg-green-300 hover:bg-green-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"}>
//                     Następna strona</button>
//             </div>
//         )
//     }
//         return (
//             <LoadingScreen/>
//         )
// }
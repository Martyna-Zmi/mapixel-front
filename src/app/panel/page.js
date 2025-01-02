"use client"
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import LoadingScreen from "@/app/utils/loadingScreen";
import DisplayUser from "@/app/panel/displayUser";
import fetchUsers from "@/app/panel/fetchUsers";

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
            const fetchedUsers = await fetchUsers({username, router})
            setUsers(fetchedUsers);
        } catch (err) {
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

        )
    }
    return (
        <LoadingScreen/>
    )
}
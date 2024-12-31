export default async function fetchUsers({username, router}) {
    try {
        const response = await fetch(`http://localhost:8080/users/username/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
            }
        });
        if (!response.ok) {
            router.push("/main")
        }
        return await response.json()
    } catch (err) {
        router.push("/main")
    }
}
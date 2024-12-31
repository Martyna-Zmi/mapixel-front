export default async function fetchUserId(router) {
    try {
        const response = await fetch(`http://localhost:8080/users/extract`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data.userId;
        }
        else {
            router.push('/login')
        }
    } catch (error) {
        router.push('/login')
    }
}
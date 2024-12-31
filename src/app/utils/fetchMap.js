export default async function fetchMap({mapId, setError = f=>f, setMap=f=>f, setFields=f=>f}) {
    try {
        const response = await fetch(`http://localhost:8080/maps/${mapId}/with-fields`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("mapixelToken")}`
            }
        });
        if (!response.ok) {
            setError(true)
        }
        const result = await response.json();
        setMap(result)
        setFields(result.fields)
    } catch (err) {
        setError(true)
    }
}
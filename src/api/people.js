

export async function getData(){
    try {
        const response = await fetch('https://swapi.dev/api/people')
        if (!response.ok) {
            throw new Error('Error en el servidor')
        }
        const data = await response.json()
        return data.results
    } catch (error) {
        throw new Error('Error en el servidor')
    }
}

export async function getDataById(id){
    try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`)
        if (!response.ok) {
            throw new Error('Error en el servidor')
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error('Error en el servidor')
    }
}

export async function getDataSearch(search){
    try {
        const response = await fetch(`https://swapi.dev/api/people/?search=${search}`)
        if (!response.ok) {
            throw new Error('Error en el servidor')
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error('Error en el servidor')
    }
}
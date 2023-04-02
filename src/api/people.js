

export async function getData(page){
    try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)
        if (!response.ok) {
            throw new Error('Error en el servidor')
        }
        const data = await response.json()
        return data
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
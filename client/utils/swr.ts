import axios from "axios"

export const fetcher = async (url: string, token: string | undefined) => {
    const res = await axios.get(url, {
        headers: {
            Authorization: "Bearer " + token
        },
        withCredentials: true 
    })

    const { data, status } = res

    if (status > 400) {
        throw new Error()
    }

    return data
}
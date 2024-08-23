import axios from "axios";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
};

const fetchData = async <T>(url: string): Promise<T> => {
    try {
        const { data } = await axios(url, options);
        return data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error("Try letter")
        }
    }
}

export default fetchData
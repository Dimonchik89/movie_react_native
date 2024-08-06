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

// const postData = async ({ url, data}: { url: string}) => {
//     try { 
//         const response = await axios({
//             url: url,
//             method: "POST",
//             fetchOptions: options,
//             data
//         })
//     } catch(error) {
//         if(error instanceof Error) {
//             throw new Error(error.message)

//         }
//     }
// }

export default fetchData
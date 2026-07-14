import axios from "axios";

const api = axios.create({
    baseURL: "https://api.seed2see.com",
    withCredentials: true, // This allows cookies to be sent with requests
    withXSRFToken: true, // This allows the XSRF token to be sent with requests
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

export default api;
import axios from "axios";

// Creating a generic method for creating all types of HTTP calls (GET, PUT, POST, ...)

// For this, we need instance of axios
export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
};

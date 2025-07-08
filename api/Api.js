import axios from "axios";

let baseDomain = "http://traveler-backend.test";
const baseURL = `${baseDomain}/api/`;

// Create Axios instance
export const ApiAxios = axios.create({
    baseURL,
    // timeout: 10000, // Example: Add a timeout
});

// --- Helper Functions ---
const setupHeaders = (token) => {
    const headers = {};
    if (token) {
        // *** Log the token being used to create the header ***
        console.log(`ApiAxios setupHeaders: Creating header with token: Bearer ${token}`);
        headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log("ApiAxios setupHeaders: No token provided.");
    }
    return headers;
};

const setupParams = (filters) => {
    const params = {};
    if (filters && typeof filters === 'object') {
        Object.keys(filters).forEach((key) => {
            if (filters[key] != null && filters[key] !== "") {
                params[key] = filters[key];
            }
        });
    }
    return params;
};

const setupBody = (data) => {
    if (!data) return {};
    if (typeof data !== "object") return {};

    const body = {};
    Object.keys(data).forEach((key) => {
        if (data[key] != null && data[key] !== "") {
            body[key] = data[key];
        }
    });
    return body;
};


// --- Exported API Methods ---
export default {
    baseDomain,

    // GET request
    index(path, token, filters = {}, customHeaders = {}) {
        const requestHeaders = {
             ...setupHeaders(token), // Generate Auth header
             ...customHeaders // Allow overriding or adding headers
        };
        const params = setupParams(filters);

        // *** Log the final request details ***
        console.log(`ApiAxios index: Sending GET to ${path} with params:`, params, "and headers:", requestHeaders);

        return ApiAxios.get(path, { params, headers: requestHeaders })
            .then((response) => {
                if (response?.status === 401) { // Basic check
                    console.warn("ApiAxios index: Received 401 status.");
                    // throw response; // Re-throw to be caught by store action
                }
                return { // Return consistent structure
                    data: response.data,
                    status: response.status
                };
            })
            .catch((error) => {
                console.error(`ApiAxios index: Error during GET request to ${path}:`, error.response?.status, error.message);
                throw error; // Re-throw
            });
    },

    // POST request
    store(path, data, token, filters = {}, customHeaders = {}) {
        const requestHeaders = {
            'Content-Type': 'application/json',
            ...setupHeaders(token),
            ...customHeaders,
        };
        const params = setupParams(filters);
        const body = setupBody(data);

        console.log(`ApiAxios store: Sending POST to ${path} with body:`, body, "params:", params, "and headers:", requestHeaders);

        return ApiAxios.post(path, body, { params, headers: requestHeaders })
            .then((response) => response)
            .catch((error) => {
                console.error(`ApiAxios store: Error during POST request to ${path}:`, error.response?.status, error.message);
                throw error;
            });
    },
    uploadImage(formData, token) {
        const headers = {
            "Content-Type": "multipart/form-data",
            ...setupHeaders(token),
        };

        return ApiAxios.post(
            "/temp-uploads/images", // Direct endpoint path
            formData,
            { headers }
        );
    },
    async downloadXls(path, data, token, filters = {}, headers = {}) {
        headers = setupHeaders(token);
        const params = setupParams(filters);
        const body = setupBody(data);

        try {
            const response = await ApiAxios.post(path, body, {
                params,
                headers,
                responseType: "blob",
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    show(id, path, token, filters = {}, headers = {}) {
        headers = setupHeaders(token);
        const params = setupParams(filters);

        if (id != "onlyPath") {
            path = `${path}/${id}`;
        }
        return ApiAxios.get(path, { params, headers })
            .then((response) => {
                if (response.data?.error) {
                    throw response;
                }
                return response;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },
    update(
        id,
        path,
        suffix,
        data,
        token,
        // eslint-disable-next-line
        allowNulls = false,
        filters = {},
        headers = {}
    ) {
        headers = setupHeaders(token);
        const params = setupParams(filters);
        const body = setupBody(data);

        if (id !== "onlyPath") {
            path = suffix ? `${path}/${id}/${suffix}` : `${path}/${id}`;
        }
        return ApiAxios.put(path, body, { params, headers })
            .then((response) => {
                if (response.data?.error) {
                    throw response;
                }
                return response;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },
    updatePatch(
        id,
        path,
        suffix,
        data,
        token,
        // eslint-disable-next-line
        allowNulls = false,
        filters = {},
        headers = {}
    ) {
        headers = setupHeaders(token);
        const params = setupParams(filters);
        const body = setupBody(data);

        if (id !== "onlyPath") {
            path = suffix ? `${path}/${id}/${suffix}` : `${path}/${id}`;
        }
        return ApiAxios.patch(path, body, { params, headers })
            .then((response) => {
                if (response.data?.error) {
                    throw response;
                }
                return response;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },
    delete(id, path, token, filters = {}, headers = {}) {
        headers = setupHeaders(token);
        const params = setupParams(filters);

        path = `${path}/${id}`;
        return ApiAxios.delete(path, { params, headers })
            .then((response) => {
                if (response.data?.error) {
                    throw response;
                }
                return response;
            })
            .catch((error) => {
                console.error(error);
                throw error;
            });
    },
};

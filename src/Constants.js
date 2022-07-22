const prod = {
    url: {
        API_URL: 'https://connectedparking.ca/api/',
        Publishable_key: '',
    }
};
const dev = {
    url: {
        // API_URL: 'http://localhost:3001/' ,
        API_URL: 'https://connectedparking.ca/api/',
    }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
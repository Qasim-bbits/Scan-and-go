const prod = {
    url: {
        API_URL: 'http://35.192.138.41/api/' ,
        Publishable_key: '',
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost:3001/' ,
        // API_URL: 'http://35.192.138.41/api/' ,
    }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
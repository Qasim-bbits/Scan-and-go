const prod = {
    url: {
        API_URL: '' ,
        Publishable_key: '',
    }
};
const dev = {
    url: {
        API_URL: 'http://localhost:3001/' ,
    }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
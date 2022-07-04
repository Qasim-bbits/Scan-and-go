const prod = {
    url: {
        API_URL: 'https://champfitter.com/champfitter-api/index.php/' ,
        Publishable_key: '',
    }
};
const dev = {
    url: {
        // API_URL: 'https://kulturking.com/kulturking-api/index.php/' ,
        API_URL: 'http://localhost:3001/' ,
    }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
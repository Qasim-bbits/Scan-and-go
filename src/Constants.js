const prod = {
    url: {
        API_URL: 'https://kulturking.com/kulturking-api/index.php/' ,
        Publishable_key: '',
    }
};
const dev = {
    url: {
        // API_URL: 'https://kulturking.com/kulturking-api/index.php/' ,
        API_URL: 'http://localhost/kulturking-api/index.php/' ,
        Publishable_key: 'pk_test_51JDF8yFMPgCzegFZyQVzPTBid8gLHHR1j67hjQM1sLSmbYBONnQ12xgq3Oz8DeRuezJYM1qds3IuQh7EZsw8r1wq00ms9dzlAA',
    }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
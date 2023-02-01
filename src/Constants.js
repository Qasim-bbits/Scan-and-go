const prod = {
    url: {
        API_URL: 'https://connectedparking.ca/api/',
        Publishable_key: 'pk_live_51LNe7jLYWOUdDhrwJl17sstIOesT8fPjo6UgCdAg4YoCrXntI4wcrqqGiLoU53wRlitawyxTMNeprxL0a2anbSnW00Jn8XL3I1',
        SHEET_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrC_EcFDpu0YM722BhD2x-nsvTiMNMx6AoMXS4LAtjkWA289GfUlrctrQM56AG0ULgYolkRJIk83-h/pub?gid=0&single=true&output=csv',
    }
};
const dev = {
    url: {
        // API_URL: 'http://localhost:3001/api/' ,
        API_URL: 'https://connectedparking.ca/api/',
        // Publishable_key: 'pk_live_51LNe7jLYWOUdDhrwJl17sstIOesT8fPjo6UgCdAg4YoCrXntI4wcrqqGiLoU53wRlitawyxTMNeprxL0a2anbSnW00Jn8XL3I1',
        Publishable_key: 'pk_test_51LNe7jLYWOUdDhrwbaAhDLSa7vS3q3l1FJGcuqxKjCyQEXeTrmrwV1gYIKA3ZDfOnesq4shVWKq5fMQGykGdeKcU008EFBRRAb',
        SHEET_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrC_EcFDpu0YM722BhD2x-nsvTiMNMx6AoMXS4LAtjkWA289GfUlrctrQM56AG0ULgYolkRJIk83-h/pub?gid=0&single=true&output=csv',
    }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
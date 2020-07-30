const DEV_URL = 'http://localhost:3000/api/v1'
const PROD_URL = 'https://babysitter-api.herokuapp.com/api/v1'
export const API_ROOT = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL
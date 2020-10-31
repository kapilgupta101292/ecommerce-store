const baseUrl = 
process.env.NODE_ENV === 'production' 
    ? 'https://myshop101292.now.sh' 
    : 'http://localhost:3000';

export default baseUrl;
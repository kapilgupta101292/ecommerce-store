// must restart server whenever you make changes in next.config
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: `http://backend:8080`
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: `http://localhost:8080`
  }
};

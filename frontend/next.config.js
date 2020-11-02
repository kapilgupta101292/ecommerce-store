// must restart server whenever you make changes in next.config
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: `http://a3827adb053c34a168d8755893c9e93e-283059086.us-east-1.elb.amazonaws.com:8080`
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: `http://a3827adb053c34a168d8755893c9e93e-283059086.us-east-1.elb.amazonaws.com:8080`
  }
};

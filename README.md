## Running locally

## Running in Production

update the next.config.js file with the loadbalanced backend service url.

```js
// must restart server whenever you make changes in next.config
module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: `http://ae7e333918b51428fa4b32cd9bfe81f3-1580552253.us-east-1.elb.amazonaws.com:8080`,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: `http://ae7e333918b51428fa4b32cd9bfe81f3-1580552253.us-east-1.elb.amazonaws.com:8080`,
  },
};
```

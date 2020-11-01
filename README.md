## Running locally

1. Clone the project from github
2. open terminal and cd deployment/docker
3. Setup the following services and get the corresponding keys
   - Create an account on mongodb atlas, create a cluster, db and get a mongo srv string
   - Setup cloudinary account and get your account name
   - Setup Strip developer account and get Strip secret key.
4. Run the exports to set in the terminal

   ```
   export MONGO_SRV=<YOUR MONGO SRV>

   export JWT_SECRET="notsosecret"

   export CLOUDINARY_URL="https://api.cloudinary.com/v1_1/<YOUR ACCOUNT NAME>/image/upload"

   export  STRIPE_SECRET_KEY=<YOUR STRIPE SECRET KEY>

   export PORT=8080

   export NODE_ENV=production

   export CLOUDWATCH_GROUP_NAME=ecommerce-store

   export CLOUDWATCH_ACCESS_KEY=<ACCESS_KEY_ID>

   export CLOUDWATCH_SECRET_ACCESS_KEY=<ACCESS_KEY_SECRET>

   export CLOUDWATCH_REGION=us-east-1

   ```

5. `docker-compose -f docker-compose-build.yaml build --parallel`
6. `docker-compose up`

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

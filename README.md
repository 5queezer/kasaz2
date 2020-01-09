![Logo Title](/assets/green-home-icon-64-177826.png?raw=true "Logo")

# kasaz map viewer

> Create a simple page to search for apartments. 

- [kasaz coding challenge](https://github.com/kasaz/coding-challenge)
- [codesandbox preview here](https://urd33.sse.codesandbox.io/)


## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
# NODE_ENV=development
$ yarn dev

# build for production and launch server
# NODE_ENV=production
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Tests
``` bash
# runs all tests
$ yarn test
```

## Google Maps
```bash
# copy sample env file
cp env_sample .env
nano .env
```

Enter your Google Maps api key and save the file.

## Data Source

Depending on your **NODE_ENV** environment variable, the data for _development_ comes from the file `/static/response.json`, and in any other case it will fetch the API endpoint `https://www.kasaz.com/api/v1/search/update_map_results`.

In _development_ mode the dataset contains data from Barcelona only.

# dataset-frontend

URL:
https://mine.data-dev.oslo.systems/

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Environment

Instead of simply using `.env` files, our environment variables can be set runtime without having to build a new image.

Environment variables are accessed like so:

```
import env from '@utils/env';
console.log(env.VUE_APP_BASE_URL)
```

This import looks for variables in `index.html` (set when running in docker).
If it cannot find any, it will fetch variables from `process.env`.

#### Local

Local environment variables are defined in the `.env` file.

#### Prod/test

Runtime environment is achieved by `entrypoint.sh`, which edits `index.html` when the docker container starts.

Set variables like so: `docker run -e VUE_APP_BASE_URL=datasets.no -e OTHER_VARIABLE=42`

## Developer guide
Core functionality like `isAuthenticated` and other Voodo magic.

See the [developer guide](docs/developer-guide.md).

## Vulnerabilities

See the [vulnerability overview](docs/vulnerabilities.md).

## Analytics

See the [analytics overview](docs/analytics.md).

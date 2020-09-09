// To support runtime environment (not set during build time, but when the app starts), this hack is necessary.
// There are two sources of environment variables:

// Docker images
// Environment variables are defined when running the docker container, and injected by entrypoint.sh (into index.html)

// Local development
// Environment variables are defined in ".env", below read from process.env

// Note:
// The following env vars are read at build time, and cannot be changed without building a new image
const buildTimeVars = ['VUE_APP_VERSION']

export default (() => {
  if (window.env !== undefined) {
    return {
      ...window.env,
      ...buildTimeVars.map((varName) => ({ [varName]: process.env[varName] })),
    }
  }

  return process.env
})()

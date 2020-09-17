// TODO connect to Sentry or similar log service
export default (Vue, context) => {
  context.onerror = (message, url, line, column, error) => {
    console.log('Generic error', { message, url, line, column, error })

    return false
  }

  context.addEventListener('unhandledrejection', (event) => {
    console.log('Unahndled error in promise', event)

    event.preventDefault()

    return false
  })

  Vue.config.errorHandler = (error, vm, info) => {
    console.log('Error from Vue', { error, vm, info })

    return false
  }
}

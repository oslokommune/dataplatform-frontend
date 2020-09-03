/*
 * Checks the user authentication status upon the initial request
 */

export default async ({ app, store }) => {
  if (!app.$env.GATEKEEPER_URL)
    throw 'Environment variable GATEKEEPER_URL is unset'

  await store.dispatch('authentication/refreshUser')
}

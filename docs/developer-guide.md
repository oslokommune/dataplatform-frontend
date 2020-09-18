# Developer guide
This page should guide you on how to start developing in this vue app.
 
## Authentication
There are three important store things:
- `isAuthenticated`
- `user`
- `login`/`logout`

These three are defined in auth store, and made more available with the auth mixin. To use of them in a component,
add the mixin to the component:
```js
export default {
  mixins: [auth],

  computed: {
    usersNameOrLoginText() {
      return this.user ? this.user.given_name : 'Log in'
    }
  }
}
```

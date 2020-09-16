# Analytics and tracking

We are using Google Analytics and [vue-gtag](https://matteo-gabriele.gitbook.io/vue-gtag/) for analytics and tracking. VueGtag automatically tracks page views.

The GA tracking ID (UA code) is defined through an environment variable.

## Event tracking

There is currently no setup for event tracking, though VueGtag has [great support](https://matteo-gabriele.gitbook.io/vue-gtag/methods/events) for this. Categories and labels should probably be constants within the module that needs tracking.

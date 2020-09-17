<template>
  <Alert :variant="variant">
    <slot></slot>
    <p v-if="hasContent">
      <small v-html="message" />
    </p>
    <tempalte v-else v-html="message" />
  </Alert>
</template>

<script>
import Alert from './'

export default {
  components: {
    Alert,
  },
  props: {
    error: [Number, String],
  },
  computed: {
    hasContent() {
      return !!this.$slots.default
    },
    variant() {
      const error = this.error

      if (error === 401 || error === 403) {
        return 'warning'
      }

      return 'danger'
    },
    message() {
      const email =
        '<a href="mailto:dataplattform@oslo.kommune.no">dataplattform@oslo.kommune.no</a>'

      const error = this.error
      if (error === 'noResponse') {
        return `Det har skjedd en feil, vennligst prøv igjen senere. Har du prøvd flere ganger, send oss en e-post ved ${email}.`
      } else if (error >= 500 && error < 600) {
        return `Det har skjedd noe galt hos oss. For å få hjelp kan du sende oss en e-post ved ${email}. Fortell hva som skjedde før denne feilen oppstod.`
      } else if (error === 401) {
        return `Det kan se ut som du brukte for lang tid på handlingen og du har derfor blitt logget ut. Vennligst logg inn på nytt for å prøve igjen.`
      } else if (error === 403) {
        return `Det virker som du ikke har tilgang. Om du trenger tilgang til kan du sende oss en e-post ved ${email}.`
      } else if (error === 404) {
        return `Vi fant dessverre ikke innholdet. For å få hjelp kan du sende oss en e-post ved ${email}.`
      }

      return `Det har skjedd en feil. For å få hjelp kan du sende oss en e-post ved ${email}.`
    },
  },
}
</script>

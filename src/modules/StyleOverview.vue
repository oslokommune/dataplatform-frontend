<template>
  <div>
    <h1>Styles</h1>

    <h2>Media queries</h2>

    <h3>Only show elements on specified screen sizes</h3>

    <p>
      The classes sm, md and lg will make the element only show on that screen
      size:
    </p>

    <span class="example sm">I'm small</span>
    <span class="example md">I'm medium</span>
    <span class="example lg">I'm large</span>

    <br />
    <br />

    <h3>Toggle different css for different screen sizes</h3>

    <div class="custom">Custom</div>

    <br />
    <br />

    <h2>Alert</h2>

    <Alert variant="danger">
      <strong>Oh my!</strong> Lorem ipsum dolor sit danger, consectetur
      <a href="#">adipiscing</a> elit.
    </Alert>

    <Alert variant="info">
      <strong>Oh my!</strong> Lorem ipsum dolor sit info, consectetur
      <a href="#">adipiscing</a> elit.
    </Alert>

    <Alert variant="muted">
      <strong>Oh my!</strong> Lorem ipsum dolor sit muted, consectetur
      <a href="#">adipiscing</a> elit.
    </Alert>

    <Alert variant="success">
      <strong>Oh my!</strong> Lorem ipsum dolor sit success, consectetur
      <a href="#">adipiscing</a> elit.
    </Alert>

    <Alert variant="warning">
      <strong>Oh my!</strong> Lorem ipsum dolor sit warning, consectetur
      <a href="#">adipiscing</a> elit.
    </Alert>
  </div>
</template>

<script>
import Alert from '@/components/Alert'

export default {
  name: 'StyleOverview',
  components: {
    Alert,
  },
}
</script>

<style lang="scss" scoped>
.example {
  border: solid 1px;
}
.custom {
  @include sm() {
    color: red;
  }

  @include md() {
    color: green;
  }

  @include lg() {
    color: blue;
  }
}
</style>

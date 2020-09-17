<template>
  <div class="alert" :class="`alert--${variant}`" role="alert">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    variant: {
      default: 'info',
      validator: (value) =>
        ['danger', 'info', 'muted', 'success', 'warning'].includes(value),
    },
  },
}
</script>

<style lang="scss" scoped>
.alert {
  font-weight: 500;
  margin-bottom: 1rem;
  padding: 1rem 2rem;

  strong {
    font-weight: 800;
  }

  a {
    color: inherit;
  }

  &--danger {
    color: $ok-state-danger-text;
    background-color: $ok-state-danger-bg;
  }
  &--info {
    color: $ok-state-info-text;
    background-color: $ok-state-info-bg;
  }
  &--muted {
    color: $ok-state-muted-text;
    background-color: $ok-state-muted-bg;
  }
  &--success {
    color: $ok-state-success-text;
    background-color: $ok-state-success-bg;
  }
  &--warning {
    color: $ok-state-warning-text;
    background-color: $ok-state-warning-bg;
  }
}
</style>

<template>
  <button
    :aria-role="ariaRole"
    :class="[disabled ? 'disabled' : variant]"
    :disabled="disabled"
    :type="type"
    class="button"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: Boolean,
    variant: {
      default: 'primary',
      validator: (value) => ['primary', 'secondary'].includes(value),
    },
    type: {
      type: String,
      default: 'button',
    },
    ariaRole: {
      type: String,
      default: 'button',
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  font-size: $font-size-sm;
  font-weight: 500;
  line-height: 1;
  min-width: 60px;
  padding: 1.15em 1.875em;
}

.primary {
  background: none $ok-blue-dark;
  border: 0 none;
  color: white;

  &:focus,
  &:hover {
    background-color: lighten($ok-blue-dark, 20);
  }
}

.secondary {
  background: none white;
  border: 2px solid $ok-blue-dark;
  color: $ok-blue-dark;

  &:focus,
  &:hover {
    border-color: lighten($ok-blue-dark, 20);
    text-decoration: underline;
  }
}

.disabled {
  border: 2px solid $grey-200;
  color: $grey-400;
}
</style>

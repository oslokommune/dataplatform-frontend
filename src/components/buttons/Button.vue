<template>
  <button
    :aria-role="ariaRole"
    class="button"
    :class="[disabled ? 'disabled' : variant]"
    :disabled="disabled"
    :type="type"
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
  background: none $ok-darkblue;
  border: 0 none;
  color: white;

  &:focus,
  &:hover {
    background-color: lighten($ok-darkblue, 20);
  }
}

.secondary {
  background: none white;
  border: 2px solid $ok-darkblue;
  color: $ok-darkblue;

  &:focus,
  &:hover {
    border-color: lighten($ok-darkblue, 20);
    text-decoration: underline;
  }
}

.disabled {
  border: 2px solid $grey-200;
  color: $grey-400;
}
</style>

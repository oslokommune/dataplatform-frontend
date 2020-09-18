<template>
  <div class="UserDropdown" @click.stop="toggleDropdown()">
    <BaseClickableIcon ref="dropdownButton">
      <IconArrowDropdown :class="{ expanded: dropdownExpanded }" />
    </BaseClickableIcon>
    <div
      v-if="dropdownExpanded"
      class="dropdown"
      v-click-outside="toggleDropdown"
    >
      <LinkButton class="logoutButton" :callback-function="logout"
        >Logg ut</LinkButton
      >
    </div>
  </div>
</template>
<script>
import BaseClickableIcon from '@/components/buttons/BaseClickableIcon'
import IconArrowDropdown from '@/components/icons/IconArrowDropdown'
import LinkButton from '@/components/buttons/LinkButton'
import auth from '@/mixins/auth'
import clickOutside from 'vue-click-outside'

export default {
  name: 'UserDropdown',
  components: { LinkButton, BaseClickableIcon, IconArrowDropdown },
  mixins: [auth],
  data() {
    return {
      dropdownExpanded: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownExpanded = !this.dropdownExpanded
    },
  },
  directives: {
    clickOutside,
  },
}
</script>

<style lang="scss" scoped>
.IconArrowDropdown {
  &.expanded {
    transform: rotate(180deg);
  }
}

.dropdown {
  margin-top: 5px;
  position: absolute;
  right: 0;
  float: left;
  background: white;
  width: 280px;
  font-weight: 500;
  border: solid 1px $grey-200;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

  a,
  .logoutButton {
    display: inline-block;
    width: 100%;
    line-height: 1.2em;
    padding: 1em 1.5em;
    text-decoration: none;

    &:hover {
      background-color: $background-secondary;
    }
  }
}
</style>

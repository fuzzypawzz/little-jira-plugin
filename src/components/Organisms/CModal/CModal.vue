<template>
  <div class="c-modal">
    <div
      class="c-modal__content"
      :class="small ? 'c-modal__content--small-width' : null"
    >
      <article class="c-modal__header">
        <div class="c-modal__bar">{{ title }}</div>
        <c-button @clicked="emitCloseClickEvent()">Close</c-button>
      </article>

      <article class="c-modal__body">
        <slot />
      </article>
    </div>
  </div>
</template>

<script>
import CButton from '@/components/Atoms/CButton/Cbutton.vue'

import { mapState } from 'vuex'

export default {
  name: 'CModal',
  components: { CButton },
  data() {
    return {
      visible: true,
    }
  },

  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState(['showModal']),

    title() {
      return browser.i18n.getMessage('extName')
    },
  },

  methods: {
    emitCloseClickEvent() {
      this.$emit('close-click')
    },
  },
}
</script>

<style lang="scss" scoped>
.c-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: rgba(78, 78, 78, 0.53);

  &__content {
    background-color: #fefefe;
    margin: 50px 20px;
    border: 4px solid #2c4a77;
    border-radius: 8px;

    &--small-width {
      margin: 50px auto;
      width: min-content;
      min-width: 300px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 12px 12px 0;
  }

  &__body {
    padding: 12px;
  }

  &__bar {
    margin: auto 0;
  }
}
</style>

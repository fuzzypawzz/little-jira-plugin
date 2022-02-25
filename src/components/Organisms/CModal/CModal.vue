<template>
  <div class="c-modal">
    <div
      class="c-modal__content"
      :class="small ? 'c-modal__content--small-width' : null"
    >
      <article class="c-modal__header">
        <div class="c-modal__bar">{{ title }}</div>
        <c-button @clicked="close">Close</c-button>
      </article>
      <article class="c-modal__body">
        <slot />
      </article>
    </div>
  </div>
</template>

<script>
import CButton from "@/components/Atoms/CButton/Cbutton.vue";

import { mapState } from "vuex";

export default {
  name: "CModal",
  components: { CButton },
  data() {
    return {
      visible: true,
    };
  },

  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState(["showModal"]),

    title() {
      return browser.i18n.getMessage("extName");
    },
  },

  beforeUnmount() {
    console.log("Modal got destroyed.");
  },

  methods: {
    close() {
      this.$router.push({ path: "/" });
      // Maybe this is not required when the router controls
      this.$emit("close-click");
    },
  },
};
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

  // .c-modal__content
  &__content {
    background-color: #fefefe;
    margin: 50px auto;
    border: 4px solid #2c4a77;
    border-radius: 8px;
    max-width: 900px;

    // .c-modal__content--small-width
    &--small-width {
      width: min-content;
      min-width: 300px;
    }
  }

  // .c-modal__header
  &__header {
    display: flex;
    justify-content: space-between;
    padding: 12px 12px 0;
  }

  // .c-modal__body
  &__body {
    padding: 12px;
  }

  // .c-modal__bar
  &__bar {
    margin: auto 0;
  }
}
</style>

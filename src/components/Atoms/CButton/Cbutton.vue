<template>
  <button class="aui-button" :class="modifiers" @click="emitClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "CButton",
  data() {
    return {};
  },

  props: {
    primary: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    modifiers() {
      return {
        "aui-button-primary": this.primary,
      };
    },
  },

  methods: {
    emitClick() {
      this.$emit("clicked");
    },
  },
});
</script>

<style>
</style>
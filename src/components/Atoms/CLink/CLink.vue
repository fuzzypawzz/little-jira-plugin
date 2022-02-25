<template>
  <a
    v-if="href"
    :class="asButton ? 'aui-button' : null"
    :href="href"
    :target="target"
  >
    <slot />
  </a>
  <router-link v-else-if="to" :to="to" :class="asButton ? 'aui-button' : null">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "CButton",
  props: {
    asButton: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
    target: {
      type: String,
      default: "",
    },
  },
});
</script>

<style>
</style>
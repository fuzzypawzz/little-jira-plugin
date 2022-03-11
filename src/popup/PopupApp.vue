<template>
  <div class="wrapper">
    <p>Little Jira Plugin is installed and running.</p>

    <p>Navigate to Jira in your browser to use it.</p>

    <c-button class="button" @clicked="openOptions()">Settings</c-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CButton from '@/components/Atoms/CButton/Cbutton.vue'

export default defineComponent({
  name: 'PopupApp',

  components: { CButton },

  methods: {
    openOptions() {
      browser.runtime.openOptionsPage()
    },
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 20px 10px;
}

p {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background: #2a67a5;
  transition: 0.1s;

  &:hover {
    background: #043278;
  }
}
</style>

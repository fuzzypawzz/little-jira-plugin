<template>
  <div class="wrapper">
    <p>Little Jira is installed and running.</p>
    <p>Go to Jira to use it.</p>
    <c-button class="button" @clicked="openOptions()">Settings</c-button>
    <hr />
    <c-button class="button" @clicked="startApp()">Start</c-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CButton from "@/components/Atoms/CButton/Cbutton.vue";

export default defineComponent({
  name: "PopupApp",
  components: { CButton },
  mounted() {
    this.startApp();
  },
  methods: {
    openOptions() {
      /* eslint-disable-next-line */
      browser.runtime.openOptionsPage();
    },

    startApp() {
      // browser.tabs.create({
      //   url: "https://jira.atlassian.teliacompany.net/secure/Dashboard.jspa",
      // });
      // // DOCS: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/insertCSS
      // browser.tabs.insertCSS({
      //   file: "/css/content-script.css",
      // });
      // browser.tabs.executeScript({
      //   file: "/js/content-script.js",
      // });
    },
  },
});
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
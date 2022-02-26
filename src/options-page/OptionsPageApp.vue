<template>
  <div class="options-page">
    <!-- JIRA URL -->
    <label for="jira-url">JIRA server url</label>
    <input
      class="u-full-width"
      v-model="path"
      type="text"
      placeholder="https://jira.atlassian.yourcompany.net"
      id="jira-url"
    />
    <!-- COLOR THEME SELECTOR
    <label for="color-theme">Color theme</label>
    <select class="u-full-width" id="color-theme">
      <option value="Default">Light (default)</option>
      <option value="Dark">Dark</option>
    </select> -->

    <!-- OVERVIEW PAGE JQL QUERY -->
    <label for="overview-jql">Issues to show in overview (JQL)</label>
    <textarea
      class="u-full-width"
      placeholder="STATUS NOT IN ('CLOSED', 'DONE', 'CANCELLED')"
      id="overview-jql"
    ></textarea>
    <label>
      <input type="checkbox" />
      <span class="label-body">Only query issues assigned to you</span>
    </label>
    <!-- SAVE CHANGES -->
    <button @click.prevent="saveOptions" class="options-page__button">
      Save changes
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OptionsPageApp",

  data() {
    return {
      storageName: "littleJiraSettings",
      path: "",
    };
  },

  mounted() {
    this.restoreOptions();
  },

  // computed: {},

  // created() {},

  methods: {
    restoreOptions() {
      // Uncaught (in promise) Error: The storage API will not work with a temporary addon ID. Please add an explicit addon ID to your manifest. For more information see https://mzl.la/3lPk1aE.
      /* eslint-disable-next-line */
      const storageItem: { [index: string]: any } = browser.storage.managed.get(
        this.storageName
      );
      this.path = storageItem[this.storageName];
    },

    saveOptions() {
      /* eslint-disable-next-line */
      browser.storage.sync.set({
        [this.storageName]: this.path,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/normalize.css";
@import "../styles/skeleton.css";

.options-page {
  padding: 10px 4px;

  &__button {
    cursor: pointer;
  }
}
</style>

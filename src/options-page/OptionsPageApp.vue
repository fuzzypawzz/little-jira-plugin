<template>
  <div class="options">
    <label for="jira-url">Your JIRA Server Url</label>

    <input
      class="u-full-width"
      v-model="jiraUrl.value"
      type="text"
      placeholder="https://jira.atlassian.yourcompany.net"
      id="jira-url"
    />

    <label for="overview-jql">Issues to show in the dashboard (JQL)</label>

    <textarea
      class="u-full-width"
      v-model="jql.value"
      placeholder="STATUS NOT IN ('CLOSED', 'DONE', 'CANCELLED')"
      id="overview-jql"
    />

    <button @click.prevent="saveStorageData()" class="options__button">
      Save changes
    </button>

    <p v-if="infoMessage" class="options__info-message">
      {{ infoMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { LOCAL_STORAGE_KEYS } from '@/constants/storage'

export default defineComponent({
  name: 'OptionsPageApp',

  data() {
    return {
      jiraUrl: {
        storageKey: LOCAL_STORAGE_KEYS.JIRA_URL,
        value: '',
      },
      jql: {
        storageKey: LOCAL_STORAGE_KEYS.JQL,
        value: '',
      },
      infoMessage: '',
    }
  },

  mounted() {
    this.restoreStorageData()
  },

  methods: {
    restoreStorageData() {
      const keys = [this.jiraUrl.storageKey, this.jql.storageKey]

      // We can use browser both in Chrome and Firefox thanks to the webextensions polyfill.
      browser.storage.sync
        .get(keys)
        .then((storageData: any) => {
          this.jiraUrl.value = storageData[this.jiraUrl.storageKey]
          this.jql.value = storageData[this.jql.storageKey]
        })
        .catch((error: string) => {
          this.infoMessage = error
        })
    },

    saveStorageData() {
      browser.storage.sync
        .set({
          [this.jiraUrl.storageKey]: this.jiraUrl.value,
          [this.jql.storageKey]: this.jql.value,
        })
        .then(() => {
          this.infoMessage = 'Settings saved!'
        })
        .catch((error: string) => {
          this.infoMessage = error
        })
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/normalize.css';
@import '../styles/skeleton.css';

.options {
  background: #f6f6f6;
  padding: 16px;

  &__button {
    background: white;
  }

  &__info-message {
    margin: unset;
  }
}
</style>

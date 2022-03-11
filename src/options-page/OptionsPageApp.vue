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
    ></textarea>

    <!-- <label>
      <input type="checkbox" />
      <span class="label-body">Only query issues assigned to you</span>
    </label> -->

    <button @click.prevent="saveStorageData()" class="options__button">
      Save changes
    </button>
    <p class="options__info-message" v-if="infoMessage">
      {{ infoMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { PREFIXES as PREFIX_ENUMS } from '@/constants/prefixes'

declare type StorageItem = Record<string, any>

export default defineComponent({
  name: 'OptionsPageApp',

  data() {
    return {
      jiraUrl: {
        storageKey: `${PREFIX_ENUMS.APP_PREFIX}jiraUrl`,
        value: '',
      },
      jql: {
        storageKey: `${PREFIX_ENUMS.APP_PREFIX}jql`,
        value: '',
      },
      infoMessage: '',
    }
  },

  mounted() {
    this.restoreStorageData()
  },

  methods: {
    getLocalStorage: browser.storage.local.get,
    setLocalStorage: browser.storage.local.set,

    restoreStorageData() {
      const keys = [this.jiraUrl.storageKey, this.jql.storageKey]

      this.getLocalStorage(keys)
        .then((storageData) => {
          this.jiraUrl.value = storageData[this.jiraUrl.storageKey]
          this.jql.value = storageData[this.jql.storageKey]
        })
        .catch((error) => {
          this.infoMessage = error
        })
    },

    saveStorageData() {
      this.setLocalStorage({
        [this.jiraUrl.storageKey]: this.jiraUrl.value,
        [this.jql.storageKey]: this.jql.value,
      })
        .then(() => {
          this.infoMessage = 'Settings saved!'
        })
        .catch((error) => {
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

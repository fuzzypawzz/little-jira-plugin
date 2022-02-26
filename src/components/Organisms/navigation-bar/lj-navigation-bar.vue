<template>
  <div class="c-search-bar">
    <p class="c-search-bar__title">{{ title }}</p>

    <input
      class="c-search-bar__input"
      placeholder="Ticket id.."
      v-model="inputValue"
      @keyup="onInputKeyUp"
    />

    <c-button primary @clicked="goToTicket()"> Søg Jira </c-button>
    <c-button primary @clicked="goToOverview()"> My overview </c-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { PREFIXES as PREFIX_ENUMS } from '@/constants/prefixes'

import { ROUTE_NAMES } from '@/router'

export default defineComponent({
  name: `lj-navigation-bar`,

  data() {
    return {
      // TODO: Remove this before deploying
      inputValue: 'TSS-1220',
      prefix: PREFIX_ENUMS.APP_PREFIX,
    }
  },

  computed: {
    title() {
      return browser.i18n.getMessage('extName')
    },
  },

  methods: {
    goToTicket() {
      if (!this.inputValue) return

      this.$router.push({ path: `/${this.prefix}${ROUTE_NAMES.ISSUE_PAGE}/${this.inputValue}` })
    },

    goToOverview() {
      if (!this.inputValue) return

      this.$router.push({ path: `/${this.prefix}${ROUTE_NAMES.DASHBOARD_PAGE}/` })
    },

    // TODO: type events
    onInputKeyUp(event: any) {
      const keyCodeForEnter = 13
      if (event.keyCode === keyCodeForEnter) {
        event.preventDefault()
        this.goToTicket()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
$atlassian-dark-blue: #043278;
$white: white;

.c-search-bar {
  display: flex;
  text-align: right;

  // TODO: Use color variable
  background: $atlassian-dark-blue;
  display: block;
  z-index: 99;
  padding: 4px 10px;

  // TODO: Use color variable
  border-bottom: thin solid #032455;

  // .c-search-bar__title
  &__title {
    display: inline-block;
    color: $white;
    margin: 0 20px;
    font-size: 16px;
  }

  // .c-search-bar__input
  &__input {
    background: $white;
    border: none;
    border-radius: 2px;
    margin-right: 8px;
    font-size: 14px;
    padding: 4px;
  }
}
</style>

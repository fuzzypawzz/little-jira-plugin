<template>
  <c-modal v-if="dataIsAvailable">
    <!-- TODO: This content should come from somewhere -->
    <h4>Hi user displayName}</h4>

    <!-- TODO: This content should come from somewhere -->
    <p>These issues are assigned to you:</p>

    <table class="aui">
      <tbody>
        <tr v-for="issue in data.issues" :key="issue.id">
          <td headers="basic-fname">{{ issue.key }}</td>

          <td headers="basic-fname">{{ issue.fields.status.name }}</td>

          <td headers="basic-fname" class="align-right">
            <c-button @clicked="goToTicketRoute(issue.key)">
              <!-- TODO: This content should come from somewhere -->
              Open issue
            </c-button>
          </td>
        </tr>
      </tbody>
    </table>
  </c-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CButton from "@/components/Atoms/CButton/Cbutton.vue";

import { mapState, mapActions } from 'vuex'

import { ROUTE_NAMES } from '@/router'

export default defineComponent({
  name: 'DashboardPage',

  data() {
    return {
      data: {
        issues: []
      }
    }
  },

  computed: {
    // ...mapState('PROFILE', ['data', 'user']),

    dataIsAvailable() {
      return true
    },
  },

  unmounted() {
    console.log('Dashboard page got unmounted')
  },

  mounted() {
    console.log('Dashboard page mounted')
    // this.JQL()
  },

  methods: {
    // ...mapActions({
    //   JQL: 'PROFILE/QUERY_JQL',
    //   getUserData: 'PROFILE/GET_USER_DATA',
    // }),

    goToTicketRoute(issueId: string) {
      // TODO: Display error message in the UI
      if (!issueId) return

      this.$router.push({ path: `/${ROUTE_NAMES.ISSUE_PAGE}/${issueId}` })
    },
  },
})
</script>

<style lang="scss" scoped>
.align-right {
  text-align: right;
}
</style>

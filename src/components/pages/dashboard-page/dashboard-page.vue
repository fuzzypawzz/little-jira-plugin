<template>
  <div>
    <!-- TODO: This content should come from somewhere -->
    <h4>Hi {{ userDetails.displayName }} ({{ userDetails.userId }})</h4>

    <!-- TODO: This content should come from somewhere -->
    <p>These {{ dashboardData.totalIssues }} issues are assigned to you:</p>

    <table class="aui">
      <tbody>
        <tr v-for="issue in dashboardData.issues" :key="issue.id">
          <td headers="basic-fname">
            <div>
              <p>{{ issue.key }}</p>
              <p>{{ issue.fields.summary }}</p>
            </div>
          </td>

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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { mapMutations, mapGetters, mapActions } from 'vuex'
import { MUTATIONS as INDEX_MUTATIONS } from '@/store'
import {
  GETTERS as PROFILE_GETTERS,
  ACTIONS as PROFILE_ACTIONS,
} from '@/store/modules/profile'

import { PREFIXES as PREFIX_ENUMS } from '@/constants/prefixes'

import { ROUTE_NAMES } from '@/router'

export default defineComponent({
  name: 'DashboardPage',

  data() {
    return {
      data: {},
      prefix: PREFIX_ENUMS.APP_PREFIX,
    }
  },

  computed: {
    ...mapGetters({
      userGetter: PROFILE_GETTERS.GET_USER,
      jqlSearchResultGetter: PROFILE_GETTERS.GET_JQL_SEARCH_RESULT,
    }),

    userDetails(): any {
      return {
        displayName: this.userGetter?.displayName,
        userId: this.userGetter?.name,
      }
    },

    dashboardData(): {
      issues: any[]
      totalIssues: number | undefined
    } {
      const data = this.jqlSearchResultGetter
      const issues: any[] = data?.issues ?? []
      const failSafeDataMap: any[] = issues.map((x: any) => {
        return {
          ...x,
          // Failsafe for nested object 'fields'
          fields: {
            ...x.fields,
            // Failsafe for nested object inside fields 'assignee'
            assignee: {
              ...x.fields?.assignee,
            },
            // Failsafe for nested object inside fields 'status'
            status: {
              ...x.fields?.status,
            },
          },
        }
      })

      return {
        issues: failSafeDataMap,
        totalIssues: data?.total,
      }
    },
  },

  async mounted() {
    await this.fetchUserAction()
    this.jiraJQLRequest()
    this.showModal()
  },

  methods: {
    ...mapMutations({
      setModalStateMutation: INDEX_MUTATIONS.SET_MODAL_STATE,
    }),

    ...mapActions({
      fetchUserAction: PROFILE_ACTIONS.FETCH_USER,
      fetchDataWithJqlAction: PROFILE_ACTIONS.FETCH_DATA_WITH_JQL,
    }),

    goToTicketRoute(issueId: string) {
      // TODO: Display error message in the UI
      if (!issueId) return

      this.$router.push({
        path: `/${this.prefix}${ROUTE_NAMES.ISSUE_PAGE}/${issueId}`,
      })
    },

    jiraJQLRequest() {
      const userId = this.userDetails?.userId

      // TODO: Handle errors
      if (!userId) console.error('User id is not defined')

      const fields = ['summary', 'assignee', 'status']
      const jql = `assignee = ${userId} AND status NOT IN ('CLOSED', 'DONE', 'CANCELLED') ORDER BY PROJECT ASC`

      this.fetchDataWithJqlAction({ fields, jql })
    },

    showModal(): void {
      this.setModalStateMutation(true)
    },
  },
})
</script>

<style lang="scss" scoped>
.align-right {
  text-align: right;
}
</style>

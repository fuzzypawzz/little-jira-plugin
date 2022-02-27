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
            <div style="max-width: 500px;">
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

import { ROUTE_NAMES } from '@/router'

export default defineComponent({
  name: 'DashboardPage',

  data() {
    return {
      data: {
        issues: [],
      },
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
      issues: [{ [index: number]: any }]
      totalIssues: number | undefined
    } {
      const data = this.jqlSearchResultGetter
      const issues: any[] = data?.issues ?? []
      const failSafeDataMap: any = issues.map((x: any) => {
        return {
          ...x,
          fields: {
            ...x.fields,
            assignee: {
              ...x.fields?.assignee,
            },
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

  mounted() {
    this.fetchUserAction()
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

      this.$router.push({ path: `/${ROUTE_NAMES.ISSUE_PAGE}/${issueId}` })
    },

    jiraJQLRequest() {
      const fields = ['summary', 'assignee', 'status']
      const jql = `assignee = jty4336 AND status NOT IN ('CLOSED', 'DONE', 'CANCELLED') ORDER BY PROJECT ASC`

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

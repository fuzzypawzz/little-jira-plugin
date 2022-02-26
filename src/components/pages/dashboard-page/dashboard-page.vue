<template>
  <div>
    <!-- TODO: This content should come from somewhere -->
    <h4>Hi {{ userDetails.displayName }} ({{ userDetails.userId }})</h4>

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
    }),

    userDetails(): any {
      return {
        displayName: this.userGetter?.displayName,
        userId: this.userGetter?.name,
      }
    },
  },

  mounted() {
    this.fetchUserAction()
    this.showModal()
  },

  methods: {
    ...mapMutations({
      setModalStateMutation: INDEX_MUTATIONS.SET_MODAL_STATE,
    }),

    ...mapActions({
      fetchUserAction: PROFILE_ACTIONS.FETCH_USER,
    }),

    goToTicketRoute(issueId: string) {
      // TODO: Display error message in the UI
      if (!issueId) return

      this.$router.push({ path: `/${ROUTE_NAMES.ISSUE_PAGE}/${issueId}` })
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

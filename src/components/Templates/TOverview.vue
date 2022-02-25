<template>
  <c-modal v-if="isReady">
    <h4>Hi {{ user.displayName }}</h4>
    <p>These issues are assigned to you:</p>

    <table class="aui">
      <tbody>
        <tr v-for="issue in data.issues" :key="issue.id">
          <td headers="basic-fname">{{ issue.key }}</td>
          <td headers="basic-fname">{{ issue.fields.status.name }}</td>
          <td headers="basic-fname" class="align-right">
            <c-button @clicked="goToTicketRoute(issue.key)">
              Open issue
            </c-button>
          </td>
        </tr>
      </tbody>
    </table>
  </c-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TOverview",
  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapState("PROFILE", ["data", "user"]),

    isReady() {
      return !!this.data && !!this.user;
    },
  },

  unmounted() {
    console.log("TOverview got destroyed");
  },

  mounted() {
    this.JQL();
  },

  methods: {
    ...mapActions({
      JQL: "PROFILE/QUERY_JQL",
      getUserData: "PROFILE/GET_USER_DATA",
    }),

    goToTicketRoute(issueId) {
      this.$router.push({ path: `/ticket/${issueId}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.align-right {
  text-align: right;
}
</style>

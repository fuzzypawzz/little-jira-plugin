<template>
  <!-- <c-modal>
    <span>{{ meta.key }}</span> <span>(Created on: {{ meta.created }})</span>
    <h2 class="no-margin">{{ summary }}</h2>
    <br />
    <div class="aui-toolbar2" role="toolbar">
      <div class="aui-toolbar2-inner">
        <div class="aui-toolbar2-primary">
          <div class="aui-buttons">
            <c-link
              class="aui-button aui-button-primary"
              :href="editIssueLink"
              target="_blank"
              >Edit</c-link
            >
          </div>

          <div class="aui-buttons">
            <c-link asButton :href="createBrowseUrl(meta.key)"
              >Go to ticket in Jira</c-link
            >
          </div>

          <div class="aui-buttons">
            <c-button disabled>Assign to me</c-button>
          </div>
        </div>
      </div>
    </div>

    <table class="aui lj-mb-2">
      <tbody>
        <tr>
          <td headers="basic-fname">Current status</td>
          <td headers="basic-lname">
            <span class="aui-lozenge aui-lozenge-success">{{
              status.title
            }}</span>
          </td>
        </tr>
        <tr>
          <td headers="basic-lname">Assignee</td>
          <td headers="basic-username">
            {{ assignee.displayName }}
          </td>
        </tr>
        <tr>
          <td headers="basic-username">Issue type</td>
          <td headers="basic-username">
            <img alt="" :src="issueType.iconUrl" width="16" height="16" />
            {{ issueType.title }}
          </td>
        </tr>
        <tr>
          <td headers="basic-lname">Reporter</td>
          <td headers="basic-username">
            {{ reporter.displayName }} {{ reporter.email }}
          </td>
        </tr>
        <tr>
          <td headers="basic-username">Labels</td>
          <td headers="basic-username">
            <span
              v-for="label in labels"
              :key="label"
              class="aui-lozenge aui-lozenge-subtle aui-lozenge-complete"
              >{{ label }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>

    <section class="description-wrapper" v-html="descriptionMarkup"></section>

    <div v-if="subtasks && subtasks.length">
      <br />
      <h5 class="no-margin">Sub tasks</h5>
      <table class="aui">
        <tbody>
          <tr v-for="subtask in subtasks" :key="subtask.id">
            <td headers="basic-fname">
              <img
                alt=""
                :src="subtask.fields.priority.iconUrl"
                width="16"
                height="16"
              />
            </td>
            <td headers="basic-fname">{{ subtask.key }}</td>
            <td headers="basic-lname">
              <span class="aui-lozenge aui-lozenge-subtle">{{
                subtask.fields.status.name
              }}</span>
            </td>
            <td headers="basic-fname">
              <a :href="createBrowseUrl(subtask.key)" target="_blank">{{
                subtask.fields.summary
              }}</a>
            </td>
            <td headers="basic-fname">{{ subtask.fields.priority.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </c-modal> -->
  <p>Issue page</p>
</template>

<script>
import CLink from "@/components/Atoms/CLink/CLink.vue";

import { mapState, mapActions } from "vuex";

export default {
  components: { CLink },

  data() {
    return {
      CModal: undefined,
      networking: false,
    };
  },

  computed: {
    ...mapState("ISSUE", [
      "status",
      "meta",
      "assignee",
      "issueType",
      "reporter",
      "descriptionMarkup",
      "labels",
      "priority",
      "issueLinks",
      "comments",
      "summary",
      "subtasks",
    ]),

    editIssueLink() {
      return `secure/EditIssue!default.jspa?id=${this.meta?.id}`;
    },
  },

  unmounted() {
    console.log("Ticket got destroyed");
  },

  created() {
    // this.loadIssue();
  },

  mounted() {
    console.log("Ticket mounted");
  },

  // beforeRouteUpdate(to, from, next) {
  //   this.loadIssue(to.params.issueId);
  //   next();
  // },

  methods: {
    // ...mapActions({
    //   getIssue: "ISSUE/GET_ISSUE",
    // }),

    // loadIssue(id) {
    //   this.getIssue(id ?? this.$route.params.issueId);
    // },

    createBrowseUrl(key) {
      return `/browse/${key}/`;
    },
  },
};
</script>

<style lang="scss" scoped>
.no-margin {
  margin: 0px;
}

.description-wrapper {
  padding: 16px 10px;
  background: #f6f6f6;
  margin: 8px 0px;
  border-radius: 8px;
}
</style>

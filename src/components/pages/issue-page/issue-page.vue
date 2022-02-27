<template>
  <div>
    <span>{{ issueData.key }}</span>
    <span>- Created on: {{ issueData.created }}</span>
    <h2 class="no-margin">{{ issueData.summary }}</h2>
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
            <c-link asButton :href="createBrowseUrl(issueData.key)"
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
            <span class="aui-lozenge aui-lozenge-success">
              {{ issueData.status.name }}
            </span>
          </td>
        </tr>
        <tr>
          <td headers="basic-lname">Assignee</td>
          <td headers="basic-username">{{ issueData.assignee }}</td>
        </tr>
        <tr>
          <td headers="basic-username">Issue type</td>
          <td headers="basic-username">
            <img
              alt=""
              :src="issueData.issuetype.iconUrl"
              width="16"
              height="16"
            />
            {{ issueData.issuetype.name }}
          </td>
        </tr>
        <tr>
          <td headers="basic-lname">Reporter</td>
          <td headers="basic-username">
            {{ issueData.reporter.displayName }} -
            {{ issueData.reporter.emailAddress }}
          </td>
        </tr>
        <tr>
          <td headers="basic-username">Labels</td>
          <td headers="basic-username">
            <span
              v-for="label in issueData.labels"
              :key="label"
              class="aui-lozenge aui-lozenge-subtle aui-lozenge-complete"
              style="margin-right: 4px"
            >
              {{ label }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <section
      class="description-wrapper"
      v-html="issueData.description"
    ></section>

    <div v-if="issueData.subtasks.length">
      <br />
      <h5 class="no-margin">Sub tasks</h5>
      <table class="aui">
        <tbody>
          <tr v-for="subtask in issueData.subtasks" :key="subtask.id">
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
              <span class="aui-lozenge aui-lozenge-subtle">
                {{ subtask.fields.status.name }}
              </span>
            </td>
            <td headers="basic-fname">
              <a :href="createBrowseUrl(subtask.key)" target="_blank">
                {{ subtask.fields.summary }}
              </a>
            </td>
            <td headers="basic-fname">{{ subtask.fields.priority.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CLink from '@/components/Atoms/CLink/CLink.vue'

import { mapMutations, mapActions, mapGetters } from 'vuex'

import { MUTATIONS as INDEX_MUTATIONS } from '@/store'
import {
  ACTIONS as ISSUE_ACTIONS,
  GETTERS as ISSUE_GETTERS,
} from '@/store/modules/issue'

export default defineComponent({
  components: { CLink },

  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      getIssueGetter: ISSUE_GETTERS.GET_ISSUE,
    }),

    editIssueLink(): string {
      return `secure/EditIssue!default.jspa?id=${this.issueData?.id}`
    },

    issueData(): any {
      const issue = this.getIssueGetter ?? {}
      const renderedFields = issue?.renderedFields ?? {}
      const fields = issue?.fields ?? {}

      const authorMapFailSafe = (x: any) => {
        return {
          ...x,
          author: {
            ...x.author,
            avatarUrls: {
              ...x.author?.avatarUrls,
            },
          },
        }
      }

      const attachments = renderedFields?.attachment?.map(authorMapFailSafe)
      const comments = renderedFields?.comment?.comments?.map(authorMapFailSafe)

      return {
        id: issue.id,
        key: issue.key,
        assignee: renderedFields?.assignee ?? '-',
        created: renderedFields?.created,
        description: renderedFields?.description,
        lastUpdated: renderedFields?.updated,
        attachments: attachments ?? [],
        comments: {
          total: renderedFields?.comment?.total,
          comments: comments ?? [],
        },
        summary: fields.summary,
        issuetype: { ...fields.issuetype },
        issuelinks: { ...fields.issuelinks },
        priority: { ...fields.priority },
        labels: fields.labels ?? [],
        reporter: { ...fields.reporter },
        subtasks: fields.subtasks ?? [],
        status: { ...fields.status },
      }
    },
  },

  mounted() {
    this.loadIssue(this.$route.params.issueId)
    this.showModal()
  },

  // beforeRouteUpdate(to, from, next) {
  //   console.log(to)
  //   this.loadIssue(to?.params?.issueId)
  //   next()
  // },

  methods: {
    ...mapMutations({
      setModalStateMutation: INDEX_MUTATIONS.SET_MODAL_STATE,
    }),

    ...mapActions({
      fetchIssueAction: ISSUE_ACTIONS.FETCH_ISSUE,
    }),

    showModal() {
      this.setModalStateMutation(true)
    },

    loadIssue(id: any) {
      this.fetchIssueAction(id ?? this.$route.params.issueId)
    },

    createBrowseUrl(key: string) {
      return `/browse/${key}/`
    },
  },
})
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

<template>
  <div>
    <span>{{ issueData.key }}</span>
    <span>- Created on: {{ issueData.created }}</span>
    <h2 class="margin--0">{{ issueData.summary }}</h2>
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

    <details-section :data="getIssueGetter" />

    <!-- TODO: Make this secure (v-html xss prone) -->
    <section
      class="description-wrapper"
      v-html="issueData.description"
    ></section>

    <br />

    <sub-task-list v-if="shouldRender.subtaskList" :data="issueData.subtasks" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CLink from '@/components/Atoms/CLink/CLink.vue'
import SubTaskList from './private/subtask-list.vue'
import DetailsSection from './private/details-section.vue'

import { mapMutations, mapActions, mapGetters } from 'vuex'
import { MUTATIONS as INDEX_MUTATIONS } from '@/store'
import {
  ACTIONS as ISSUE_ACTIONS,
  GETTERS as ISSUE_GETTERS,
} from '@/store/modules/issue'

import { getLozengeStyle } from '@/helpers/ui'

import { JiraIssue } from '@/store/modules/issue.types'
import { IDestructuredIssueData } from './issue-page.types'

export default defineComponent({
  components: { CLink, SubTaskList, DetailsSection },

  computed: {
    ...mapGetters({
      getIssueGetter: ISSUE_GETTERS.GET_ISSUE,
    }),

    editIssueLink(): string {
      return `secure/EditIssue!default.jspa?id=${this.issueData?.id}`
    },

    shouldRender(): { [index: string]: boolean } {
      return {
        subtaskList: !!this.issueData.subtasks.length,
      }
    },

    issue(): JiraIssue {
      return this.getIssueGetter
    },

    status(): any {
      const status = this.issue.fields?.status
      const colorName = status?.statusCategory?.colorName

      return {
        name: status?.name,
        lozengeStyle: getLozengeStyle(colorName),
      }
    },

    issueData(): IDestructuredIssueData {
      const issue: JiraIssue = this.getIssueGetter
      const renderedFields = issue?.renderedFields
      const fields = issue?.fields

      return {
        id: issue.id,
        key: issue.key,
        assignee: renderedFields?.assignee ?? '-',
        created: renderedFields?.created,
        description: renderedFields?.description,
        lastUpdated: renderedFields?.updated,
        attachments: renderedFields?.attachment ?? [],
        comments: renderedFields?.comment?.comments ?? [],
        summary: fields?.summary,
        issuetype: fields?.issuetype ?? {},
        issuelinks: fields?.issuelinks ?? [],
        priority: fields?.priority ?? {},
        labels: fields?.labels ?? [],
        reporter: fields?.reporter ?? {},
        subtasks: fields?.subtasks ?? [],
      }
    },
  },

  mounted() {
    this.fetchIssueAction(this.$route.params.issueId)
    this.showModal()
  },

  methods: {
    ...mapMutations({
      setModalStateMutation: INDEX_MUTATIONS.SET_MODAL_STATE,
    }),

    ...mapActions({
      fetchIssueAction: ISSUE_ACTIONS.FETCH_ISSUE,
    }),

    getLozengeStyle,

    showModal() {
      this.setModalStateMutation(true)
    },

    createBrowseUrl(key: string) {
      return `/browse/${key}/`
    },
  },
})
</script>

<style lang="scss" scoped>
.margin {
  &--0 {
    margin: 0px;
  }
}

.description-wrapper {
  padding: 16px 10px;
  background: #f6f6f6;
  margin: 8px 0px;
  border-radius: 8px;
}
</style>

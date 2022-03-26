<template>
  <div>
    <div>
      <p>
        <c-link href="/">{{ issueData.key }}</c-link>
      </p>
      <h2 class="margin--0">{{ issueData.summary }}</h2>
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
    </div>
    <br />
    <div style="display: flex">
      <div>
        <section>
          <h4>Details</h4>
          <details-section :data="getIssueGetter" />
        </section>
        <br />
        <!-- TODO: Make this secure (v-html xss prone) -->
        <section>
          <h4>Description</h4>
          <div class="description-wrapper" v-html="issueData.description"></div>
        </section>

        <br />

        <section>
          <h4>Sub tasks</h4>
          <sub-task-list
            style="margin: 8px auto"
            v-if="shouldRender.subtaskList"
            :data="issueData.subtasks"
          />
        </section>
      </div>
      <div style="width: 30%; padding-left: 20px">
        <section>
          <h4>People</h4>
          <dl class="description-list">
            <dt>Assignee</dt>
            <dd>{{ issueData.assignee.displayName }}</dd>

            <dt>Reporter</dt>
            <dd>{{ issueData.reporter.displayName }}</dd>
          </dl>
        </section>
        <br />
        <section>
          <h4>Dates</h4>
          <dl class="description-list">
            <dt>Created:</dt>
            <dd>{{ issueData.created }}</dd>

            <dt>Updated:</dt>
            <dd>{{ issueData.updated }}</dd>
          </dl>
        </section>
      </div>
    </div>
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
        assignee: fields?.assignee ?? '-',
        created: renderedFields?.created,
        updated: renderedFields?.updated,
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

.description-list {
  display: flex;
  flex-wrap: wrap;

  & dt {
    width: 33%;
  }

  & dd {
    margin-left: auto;
    width: 66%;
  }
}

.description-wrapper {
  padding: 16px 10px;
  background: #f6f6f6;
  margin: 8px 0px;
  border-radius: 8px;
}
</style>

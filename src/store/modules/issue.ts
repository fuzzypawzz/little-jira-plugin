import fetchAction from '@/helpers/browserSpecificFetch'
import { JiraIssue } from './issue.types'

// TODO: Move state to issue.types.ts when it grows bigger
type State = {
  data: JiraIssue
}

export const MUTATIONS = {
  ADD_ISSUE_DATA: 'ADD_ISSUE_DATA',
}

export const ACTIONS = {
  FETCH_ISSUE: 'FETCH_ISSUE',
}

export const GETTERS = {
  GET_ISSUE: 'GET_ISSUE',
}

// TODO: Fix issue with store module typings
// Can not get this this to work without using any here
const issueStore: any = {
  // namespaced: true,

  state: (): State => ({
    data: {} as JiraIssue,
  }),

  mutations: {
    [MUTATIONS.ADD_ISSUE_DATA](state: State, data: JiraIssue) {
      state.data = data
    },
  },

  actions: {
    [ACTIONS.FETCH_ISSUE]({ commit, rootState }: any, issueId: string) {
      // TODO: Get urls from central place
      const url = `${rootState?.settings?.jiraUrl}/rest/api/2/issue`
      const settings = {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        headers: {
          /**
           * WORKAROUND
           * Jira has a problem with the user-agent-string Mozilla/5.0..
           * Read the issue on atlassian forums:
           * https://community.atlassian.com/t5/Jira-questions/Jira-7-rest-api-XSRF-check-failed-for-post-issue-with/qaq-p/488706
           */
          'User-Agent': 'rubbish',
          'Content-Type': 'application/json',
        },
      }

      const queryData = {
        expand: 'renderedFields',
        fields: [
          'summary',
          'description',
          'status',
          'assignee',
          'resolution',
          'issuetype',
          'reporter',
          'subtasks',
          'issuelinks',
          'labels',
          'priority',
          'created',
          'updated',
          'attachment',
          'comment',
        ],
        fieldsByKeys: false,
      }

      // TODO: Fix type with URLSearchParams argument
      const queryParams = new URLSearchParams(queryData as any).toString()
      const contructedUrl = `${url}/${issueId}?${queryParams}`

      return fetchAction(contructedUrl, settings)
        .then((response) => response.json())
        .then((data: JiraIssue) => {
          commit(MUTATIONS.ADD_ISSUE_DATA, data)
        })
        .catch((error) => {
          console.error(
            '[ACTIONS.FETCH_ISSUE] failed to get issue data. Error: ' + error
          )
        })
    },
  },

  getters: {
    [GETTERS.GET_ISSUE](state: State): JiraIssue {
      return state.data
    },
  },
}

export default issueStore

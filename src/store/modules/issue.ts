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
    [ACTIONS.FETCH_ISSUE]({ commit }: any, issueId: string) {
      const url = 'https://jira.atlassian.teliacompany.net/rest/api/2/issue'
      const settings = {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        headers: {
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
          console.log(data)
          commit(MUTATIONS.ADD_ISSUE_DATA, data)
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

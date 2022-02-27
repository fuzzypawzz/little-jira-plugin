import fetchAction from '@/helpers/browserSpecificFetch'
import { State } from './profile.types'

export const MUTATIONS = {
  SET_PROJECTS: 'SET_PROJECTS',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_JQL_SEARCH_RESULTS: 'SET_JQL_SEARCH_RESULTS',
  CLEAR_JQL_SEARCH_RESULTS: 'CLEAR_JQL_SEARCH_RESULTS',
}

export const ACTIONS = {
  FETCH_USER: 'FETCH_USER',
  // TODO: Should be moved to another store when I know where it belongs
  FETCH_DATA_WITH_JQL: 'FETCH_DATA_WITH_JQL',
}

export const GETTERS = {
  GET_USER: 'GET_USER',
  GET_JQL_SEARCH_RESULT: 'GET_JQL_SEARCH_RESULT',
  GET_TEST: 'GET_TEST',
}

const defaultState: State = {
  user: {
    username: undefined,
    userId: undefined,
  },
  projects: undefined,
  jqlSearchResult: [],
}

// TODO: Fix issue with store module typings
// Can not get this this to work without using any here
const profileStore: any = {
  // TODO: add namespacing
  // namespaced: true,

  state: (): State => ({
    ...defaultState,
  }),

  mutations: {
    [MUTATIONS.SET_PROJECTS](state: State, data: any) {
      state.projects = data
    },

    [MUTATIONS.SET_USER_DATA](state: State, data: any) {
      state.user = data
    },

    [MUTATIONS.SET_JQL_SEARCH_RESULTS](state: State, data: any[]) {
      state.jqlSearchResult = data
    },

    [MUTATIONS.CLEAR_JQL_SEARCH_RESULTS](state: State) {
      state.jqlSearchResult = defaultState.jqlSearchResult
    },
  },

  actions: {
    async [ACTIONS.FETCH_USER]({ commit }: any, issueId: string) {
      const url = 'https://jira.atlassian.teliacompany.net/rest/api/2/myself'
      const settings = {
        method: 'GET',
        mode: 'same-origin',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }

      // TODO: Get url from settings
      const response = await fetchAction(url, settings).then((response) =>
        response.json()
      )

      console.log(response)
      commit(MUTATIONS.SET_USER_DATA, response)
    },

    async [ACTIONS.FETCH_DATA_WITH_JQL]({ commit }: any, { fields, jql }: any) {
      const url = 'https://jira.atlassian.teliacompany.net/rest/api/2/search'
      const settings = {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields,
          jql,
        }),
      }

      const response = await fetchAction(url, settings).then((response) =>
        response.json()
      )

      console.log(response)
      commit(MUTATIONS.SET_JQL_SEARCH_RESULTS, response)
    },
  },

  getters: {
    [GETTERS.GET_USER](state: State) {
      return state.user
    },

    [GETTERS.GET_JQL_SEARCH_RESULT](state: State): any[] {
      return state.jqlSearchResult ?? []
    },
  },
}

export default profileStore

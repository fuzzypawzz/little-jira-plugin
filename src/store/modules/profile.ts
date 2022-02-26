import fetchAction from '@/helpers/browserSpecificFetch'

import { State } from './profile.types'

export const MUTATIONS = {
  SET_PROJECTS: 'SET_PROJECTS',
  SET_USER_DATA: 'SET_USER_DATA',
}

export const ACTIONS = {
  FETCH_USER: 'FETCH_USER',
}

export const GETTERS = {
  GET_USER: 'GET_USER',
}

export default {
  state: (): State => ({
    user: {
      username: 'Jannik',
      userId: 'JTY4336',
    },
    projects: undefined,
  }),

  mutations: {
    [MUTATIONS.SET_PROJECTS](state: State, data: any) {
      state.projects = data
    },

    [MUTATIONS.SET_USER_DATA](state: State, data: any) {
      state.user = data
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

      // Send response to background script to get access to it

      // function getUser() {}
      // getUser
      //   .then((response) => {
      //     if (response.key) {
      //       // Send response to background so it can be added to the store
      //       this._vm.$port.postMessage({ userData: response });
      //     } else throw new Error(response.errorMessages[0]);
      //   })
      //   .catch((error: any) => {
      //     console.error(error);
      //   });
    },
  },

  getters: {
    [GETTERS.GET_USER](state: State) {
      return state.user
    },
  },
}

import fetch from '@/helpers/browserSpecificFetch'

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
    [ACTIONS.FETCH_USER]({ commit }: any, issueId: string) {
      fetch()
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

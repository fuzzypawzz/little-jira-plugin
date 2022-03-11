import { createStore } from 'vuex'

import issue from '@/store/modules/issue'
import profile from '@/store/modules/profile'

export type RootState = {
  settings: ISettings
  showModal: boolean
  apiError: {
    hasError: boolean
    message: string | undefined
  }
}

export interface ISettings {
  jiraUrl?: string
  dashboardJql?: string
}

export const MUTATIONS = {
  SET_SETTINGS: 'SET_SETTINGS',
  SET_MODAL_STATE: 'SET_MODAL_STATE',
  SET_API_ERROR_STATE: 'SET_API_ERROR_STATE',
  RESET_API_ERROR_STATE: 'RESET_API_ERROR_STATE',
}

export const ACTIONS = {
  FETCH_ISSUE: 'FETCH_ISSUE',
}

const defaultState: RootState = {
  settings: {
    jiraUrl: '',
    dashboardJql: '',
  },
  showModal: false,
  apiError: {
    hasError: false,
    message: undefined,
  },
}

const rootStore: any = createStore({
  state(): RootState {
    return {
      ...defaultState,
    }
  },

  mutations: {
    [MUTATIONS.SET_SETTINGS](state: RootState, settings: ISettings) {
      state.settings = {
        ...state.settings,
        ...settings,
      }
    },

    [MUTATIONS.SET_MODAL_STATE](state: RootState, value: boolean) {
      state.showModal = Boolean(value)
    },

    [MUTATIONS.SET_API_ERROR_STATE](state: RootState, message: string) {
      state.apiError = {
        hasError: true,
        message: message,
      }
    },

    [MUTATIONS.RESET_API_ERROR_STATE](state: RootState) {
      state.apiError = defaultState.apiError
    },
  },

  actions: {},

  getters: {},

  modules: {
    issue,
    profile,
  },
})

export default rootStore

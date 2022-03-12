import { createStore } from 'vuex'

import issue from '@/store/modules/issue'
import profile from '@/store/modules/profile'

import { LOCAL_STORAGE_KEYS } from '@/constants/storage'

type RootState = {
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
  UPDATE_SETTINGS_FROM_STORAGE: 'UPDATE_SETTINGS_FROM_STORAGE',
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

  actions: {
    [ACTIONS.UPDATE_SETTINGS_FROM_STORAGE]({ commit, state }: any) {
      const keys = [LOCAL_STORAGE_KEYS.JIRA_URL, LOCAL_STORAGE_KEYS.JQL]

      return new Promise((resolve, reject) => {
        browser.storage.local
          .get(keys)
          .then((storageData) => {
            const settings: ISettings = {
              jiraUrl: storageData[LOCAL_STORAGE_KEYS.JIRA_URL],
              dashboardJql: storageData[LOCAL_STORAGE_KEYS.JQL],
            }

            commit(MUTATIONS.SET_SETTINGS, settings)
            resolve(state.settings)
          })
          .catch((error) => reject(error))
      })
    },
  },

  modules: {
    issue,
    profile,
  },
})

export default rootStore

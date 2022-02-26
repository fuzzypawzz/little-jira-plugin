import { createStore } from "vuex";

import issue from "@/store/modules/issue";
import profile from "@/store/modules/profile";

type State = {
  showModal: boolean;
  apiError: {
    hasError: boolean;
    message: string | undefined;
  };
};

export const MUTATIONS = {
  SET_MODAL_STATE: "SET_MODAL_STATE",
  SET_API_ERROR_STATE: "SET_API_ERROR_STATE",
  RESET_API_ERROR_STATE: "RESET_API_ERROR_STATE",
};

export const ACTIONS = {
  FETCH_ISSUE: "FETCH_ISSUE",
};

const defaultState: State = {
  showModal: true,
  apiError: {
    hasError: false,
    message: undefined,
  },
};

export default createStore({
  state(): State {
    return {
      ...defaultState,
    };
  },

  mutations: {
    [MUTATIONS.SET_MODAL_STATE](state: State, value: boolean) {
      state.showModal = Boolean(value);
    },

    [MUTATIONS.SET_API_ERROR_STATE](state: State, message: string) {
      state.apiError = {
        hasError: true,
        message: message,
      };
    },

    [MUTATIONS.RESET_API_ERROR_STATE](state: State) {
      state.apiError = defaultState.apiError;
    },
  },

  modules: {
    issue,
    profile,
  },
});

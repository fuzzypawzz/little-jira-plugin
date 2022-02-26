type State = {
  user: any;
  projects: any;
};

export const MUTATIONS = {
  SET_PROJECTS: "SET_PROJECTS",
  SET_USER_DATA: "SET_USER_DATA",
};

export const ACTIONS = {
  FETCH_USER: "FETCH_USER",
};

export default {
  state: (): State => ({
    user: undefined,
    projects: undefined,
  }),

  mutations: {
    [MUTATIONS.SET_PROJECTS](state: State, data: any) {
      state.projects = data;
    },

    [MUTATIONS.SET_USER_DATA](state: State, data: any) {
      state.user = data;
    },
  },

  actions: {
    [ACTIONS.FETCH_USER]({ commit }: any, issueId: string) {
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
};

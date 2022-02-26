type State = {
  data: any[];
};

export const MUTATIONS = {
  ADD_ISSUE_DATA: "ADD_ISSUE_DATA",
};

export const ACTIONS = {
  FETCH_ISSUE: "FETCH_ISSUE",
};

export default {
  state: (): State => ({
    data: [],
  }),

  mutations: {
    [MUTATIONS.ADD_ISSUE_DATA](state: State, data: any[]) {
      state.data = data;
    },
  },

  actions: {
    [ACTIONS.FETCH_ISSUE]({ commit }: any, issueId: string) {
      // fetch the issue with fetch
    },
  },
};

type State = {
  data: any[];
};

export const MUTATIONS = {
  ADD_ISSUE_DATA: "ADD_ISSUE_DATA",
};

export const ACTIONS = {
  FETCH_ISSUE: "FETCH_ISSUE",
};

// TODO: Fix issue with store module typings
// Can not get this this to work without using any here
const issueStore: any = {
  // namespaced: true,

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

export default issueStore

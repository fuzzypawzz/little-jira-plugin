export default {
  install(Vue, store) {
    const backgroundPort = browser.runtime.connect({
      name: "primary-port",
    });

    backgroundPort.onMessage.addListener((message) => {
      /**
       * ISSUE DATA RECEIVED FROM BACKGROUND SCRIPT
       * Adds issue data to the store
       */
      if (message?.issueData) {
        store.commit("ISSUE/ADD_ISSUE_DATA", message.issueData);
        store.commit("SET_MODAL_STATE", true, { root: true });
      }

      if (message?.jqlResponse) {
        store.commit("PROFILE/SET_DATA", message.jqlResponse);
        store.commit("SET_MODAL_STATE", true, { root: true });
      }

      if (message?.userData) {
        store.commit("PROFILE/SET_USER_DATA", message.userData);
      }
    });

    Vue.prototype.$port = backgroundPort;
  },
};

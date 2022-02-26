export default {
  install(app: any, options: any) {
    const backgroundPort = browser.runtime.connect(undefined, {
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

    // TODO: Convert to vue 3
    Vue.prototype.$port = backgroundPort;
  },
};

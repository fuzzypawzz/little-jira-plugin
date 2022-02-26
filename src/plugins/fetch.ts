type Fetch = (params: { [index: string]: any }) => Promise<any>;

export default {
  install: (app: any, options: any) => {
    // eslint-disable-next-line no-undef
    const _browserSpecificFetch = content.fetch ?? fetch;

    app.config.globalProperties.$fetch = (
      url: string,
      params: { [index: string]: any }
    ) => {
      const requestDetails = {
        method: "GET",
        mode: "same-origin",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const queryParams = new URLSearchParams(params);

      return _browserSpecificFetch(`${url}/${queryParams}`, requestDetails);
    };
  },
};

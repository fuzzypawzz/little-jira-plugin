const { defineConfig } = require("@vue/cli-service");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.plugin("extract-css").tap((options) => {
      /**
       * Ensures consistent css file naming in output.
       * For example dist/css/popup.css instead of popup3489023.css
       */
      options[0].filename = "css/[name].css";
      return options;
    });

    /**
     * Disable chunk splitting. This is necessary since auto-reload
     * would not trigger on chunks - so we would not see updates on
     * component level.
     * Source: https://medium.com/@johannes.lauter/building-a-vue-browser-extension-including-tailwind-848e0e451f50
     */
    config.optimization.delete("splitChunks");
  },

  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/webextension-polyfill/dist/browser-polyfill.js",
          },
        ],
      }),
    ],
  },

  css: {
    extract: true,
  },

  pages: {
    popup: {
      template: "./src/popup/popup.html",
      entry: "./src/popup/main.ts",
      title: "Popup",
    },
    options: {
      template: "./src/options-page/options.html",
      entry: "./src/options-page/options-page-script.ts",
      title: "Options",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.ts",
        },
        contentScripts: {
          entries: {
            "content-script": ["src/content-script.ts"],
          },
        },
      },
    },
  },
});

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	chainWebpack: (config) => {
		config.plugin("extract-css").tap((options) => {
			options[0].filename = "css/[name].css";
			return options;
		});
	},

	css: {
		extract: true,
	},

	pages: {
		popup: {
			template: "public/browser-extension.html",
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

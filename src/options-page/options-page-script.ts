// import devtools from "@vue/devtools";
import { createApp } from "vue";
import App from "./OptionsPageApp.vue";

/**
 *	Vue devtools in the browser doesn't work here.
 *	Instead you can install @vue/devtools seperately and connect to them.
 *  NOTICE: Remember to import devtools before Vue itself.
 */
if (process.env.NODE_ENV === "development") {
  // devtools.connect('http://localhost', '8098');
}

createApp(App).mount("#optionsapp");

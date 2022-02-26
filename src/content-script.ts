import devtools from "@vue/devtools";
import { createApp } from "vue";
import App from "@/components/App/App.vue";
import CButton from "@/components/Atoms/CButton/Cbutton.vue";
import CModal from "@/components/Organisms/CModal/CModal.vue";
import store from "@/store";
import router from "@/router";
import portListenerPlugin from "@/plugins/backgroundPortListener";

try {
  // TODO: Type window
  if (!(window as any).littleJira) {
    (window as any).littleJira = true;
    /**
     *	Vue devtools in the browser doesn't work here.
     *	Instead you can install @vue/devtools seperately and connect to them.
     *  NOTICE: Remember to import devtools before Vue itself.
     */
    if (process.env.NODE_ENV === "development") {
      // devtools.connect("http://localhost", "8098");
    }

    const div = document.createElement("div");
    div.id = "app1";
    document.body.prepend(div);

    console.log(createApp)

    createApp(App)
      .use(portListenerPlugin)
      .use(store)
      .use(router)
      .component("c-button", CButton)
      .component("c-modal", CModal)
      .mount("#app1");
  }
} catch (e) {
  console.error(e);
}

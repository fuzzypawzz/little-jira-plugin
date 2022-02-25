<template>
  <div>
    <button>TEEEST</button>
    <!-- THIS COMPONENT IS NOT IN USE, SHOULD BE DELETED -->
    <!-- FOR NOW ITS KEPT HERE TO SHOW HOW TO COMMUNICATE WITH BACKGROUND WAS DONE -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {
      port: undefined,
      inputValue: "",
    };
  },

  mounted() {
    this.port = browser.runtime.connect({
      name: "popup-port",
    });
  },

  computed: {},

  created() {},

  methods: {
    clickHandler() {
      this.port.postMessage({ log: this.inputValue });
    },
  },
};
</script>

<style scoped>
p {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>

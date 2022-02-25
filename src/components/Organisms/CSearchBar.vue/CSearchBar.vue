<template>
  <div class="c-search-bar">
    <p class="c-search-bar__title">{{ title }}</p>

    <input
      class="c-search-bar__input"
      placeholder="Ticket id.."
      v-model="inputValue"
      @keyup="onInputKeyUp"
    />

    <c-button primary @clicked="search()"> Søg Jira </c-button>
    <c-button primary @clicked="overview()"> My overview </c-button>
  </div>
</template>

<script>
export default {
  name: "CSearchBar",
  components: {},

  data() {
    return {
      inputValue: "TSS-1220",
    };
  },

  computed: {
    title() {
      return browser.i18n.getMessage("extName");
    },
  },

  methods: {
    search() {
      if (!this.inputValue) return;
      this.$router.push({ path: `/ticket/${this.inputValue}` });
    },

    overview() {
      if (!this.inputValue) return;
      this.$router.push({ path: "/overview/" });
    },

    onInputKeyUp(event) {
      const keyCodeForEnter = 13;
      if (event.keyCode === keyCodeForEnter) {
        event.preventDefault();
        this.search();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c-search-bar {
  display: flex;
  text-align: right;
  background: #043278;
  display: block;
  z-index: 99;
  padding: 4px 10px;
  border-bottom: thin solid #032455;

  // .c-search-bar__title
  &__title {
    display: inline-block;
    color: white;
    margin: 0 20px;
    font-size: 16px;
  }

  // .c-search-bar__input
  &__input {
    background: white;
    border: none;
    border-radius: 2px;
    margin-right: 8px;
    font-size: 14px;
    padding: 4px;
  }
}
</style>
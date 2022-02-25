<template>
  <div>
    <c-search-bar></c-search-bar>
    <router-view v-if="isReady"></router-view>

    <!-- REMOVE THE MODAL STATE STATE IF ITS NO REQURIED -->
    <!-- <c-modal
      v-if="showModal && !apiError.hasError"
      @close-click="toggleModalState(false)"
    >
      <router-view></router-view>
    </c-modal> -->

    <!-- Error should be removed when next request is successful, not only on click here -->
    <!-- Tried loading ticket, then loading not existing ticket, and then loading ticket again,
    and the error modal is still visible, because api error state is not cleared -->
    <c-modal v-if="apiError.hasError" small @close-click="removeApiError">
      <p>{{ apiError.message }}</p>
    </c-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CSearchBar from "@/components/Organisms/CSearchBar.vue/CSearchBar.vue";

import { mapState, mapMutations, mapActions } from "vuex";

export default defineComponent({
  name: "App",
  components: { CSearchBar },
  data() {
    return {
      contentContext: undefined,
    };
  },

  computed: {
    ...mapState(["showModal", "apiError"]),
    ...mapState("PROFILE", ["user"]),

    isReady() {
      return !!this.user;
    },
  },

  created() {
    if (!this.user) this.getUserData();
  },

  methods: {
    ...mapMutations({
      toggleModalState: "SET_MODAL_STATE",
      removeApiError: "REMOVE_API_ERROR",
    }),

    ...mapActions({
      getUserData: "PROFILE/GET_USER_DATA",
    }),
  },
});
</script>

<style>
</style>

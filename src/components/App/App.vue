<template>
  <div>
    <lj-navigation-bar />

    <c-modal
      v-show="showModal && !apiError.hasError"
      @close-click="closeClickHandler()"
    >
      <router-view></router-view>
    </c-modal>

    <!-- TODO: Move error handling to error page -->
    <c-modal v-if="apiError.hasError" small @close-click="closeClickHandler()">
      <p>{{ apiError.message }}</p>
    </c-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LjNavigationBar from '@/components/Organisms/navigation-bar/lj-navigation-bar.vue'
import CModal from '@/components/Organisms/CModal/CModal.vue'

import { mapState, mapMutations } from 'vuex'
import { MUTATIONS as INDEX_MUTATIONS } from '@/store'

export default defineComponent({
  name: 'App',

  components: { LjNavigationBar, CModal },

  computed: {
    ...mapState(['showModal', 'apiError']),
  },

  methods: {
    ...mapMutations({
      setModalStateMutation: INDEX_MUTATIONS.SET_MODAL_STATE,
    }),

    closeClickHandler(): void {
      this.hideModal()
      this.navigateToRoot()
    },

    navigateToRoot(): void {
      // TODO: Fix this warning: [Vue Router warn]: No match found for location with path "/"
      this.$router.push({ path: '/' })
    },

    hideModal(): void {
      this.setModalStateMutation(false)
    },
  },
})
</script>

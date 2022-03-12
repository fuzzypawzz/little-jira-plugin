<template>
  <div>
    <lj-navigation-bar />

    <c-modal
      v-show="showModal && !apiError.hasError"
      @close-click="closeClickHandler()"
    >
      <router-view v-if="storageSettingsLoaded"></router-view>
    </c-modal>

    <!-- TODO: Move error handling to error page -->
    <c-modal
      v-if="apiError.hasError"
      small
      @close-click="resetApiErrorStateMutation()"
    >
      <p>{{ apiError.message }}</p>
    </c-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LjNavigationBar from '@/components/Organisms/navigation-bar/lj-navigation-bar.vue'
import CModal from '@/components/Organisms/CModal/CModal.vue'

import { mapState, mapMutations, mapActions } from 'vuex'
import {
  MUTATIONS as INDEX_MUTATIONS,
  ACTIONS as INDEX_ACTIONS,
  ISettings,
} from '@/store'

export default defineComponent({
  name: 'App',

  components: { LjNavigationBar, CModal },

  data() {
    return {
      storageSettingsLoaded: false,
    }
  },

  computed: {
    ...mapState(['showModal', 'apiError']),
  },

  created() {
    this.updateSettingsFromStorageAction().then((settings: ISettings) => {
      if (settings?.jiraUrl) {
        this.storageSettingsLoaded = true
      } else {
        this.setApiErrorStateMutation(
          `Your Jira settings was not loaded correctly.
          Check if you have entered valid settings in the extension settings menu.
          Little Jira Plugin won't work without a valid Jira server url.`
        )
      }
    })
  },

  methods: {
    ...mapMutations({
      setModalStateMutation: INDEX_MUTATIONS.SET_MODAL_STATE,
      setSettingsMutation: INDEX_MUTATIONS.SET_SETTINGS,
      setApiErrorStateMutation: INDEX_MUTATIONS.SET_API_ERROR_STATE,
      resetApiErrorStateMutation: INDEX_MUTATIONS.RESET_API_ERROR_STATE,
    }),

    ...mapActions({
      updateSettingsFromStorageAction:
        INDEX_ACTIONS.UPDATE_SETTINGS_FROM_STORAGE,
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

<style lang="scss" scoped>
@import '@/styles/main.scss';
</style>

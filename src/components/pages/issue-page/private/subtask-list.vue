<template>
  <div>
    <table class="aui">
      <tbody>
        <tr v-for="subtask in subtasks" :key="subtask.id">
          <td headers="basic-fname">
            <img alt="" :src="subtask.iconUrl" width="16" height="16" />
          </td>

          <td headers="basic-fname">{{ subtask.key }}</td>

          <td headers="basic-lname">
            <span
              class="aui-lozenge aui-lozenge-subtle"
              :class="subtask.lozengeStyle"
            >
              {{ subtask.statusName }}
            </span>
          </td>

          <td headers="basic-fname">
            <a :href="subtask.browseUrl" target="_blank">
              {{ subtask.summary }}
            </a>
          </td>

          <td headers="basic-fname">{{ subtask.priorityName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { SubTaskEntry } from '@/store/modules/issue.types'
import { getLozengeStyle } from '@/helpers/ui'

declare type DestructuredSubtask = {
  id: string
  key: string
  iconUrl: string | undefined
  statusName: string | undefined
  lozengeStyle: string
  priorityName: string | undefined
  summary: string | undefined
  browseUrl: string
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<SubTaskEntry[]>,
      default: () => [],
    },
  },

  computed: {
    subtasks(): DestructuredSubtask[] {
      return this.data.reduce((acc, current) => {
        acc.push({
          id: current.id,
          key: current.key,
          iconUrl: current.fields?.priority?.iconUrl,
          statusName: current.fields?.status?.name,
          lozengeStyle: getLozengeStyle(
            current.fields?.status?.statusCategory?.colorName
          ),
          priorityName: current.fields?.priority?.name,
          summary: current.fields?.summary,
          browseUrl: this.createBrowseUrl(current.key),
        })

        return acc
      }, [] as DestructuredSubtask[])
    },
  },

  methods: {
    createBrowseUrl(key: string) {
      return `/browse/${key}/`
    },
  },
})
</script>

<style scoped lang="scss"></style>

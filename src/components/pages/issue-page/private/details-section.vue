<template>
  <table class="aui lj-mb-2">
    <tbody>
      <tr>
        <td headers="basic-fname">Current status</td>

        <td headers="basic-lname">
          <span class="aui-lozenge" :class="issueData.status.lozengeStyle">
            {{ issueData.status.name }}
          </span>
        </td>
      </tr>

      <tr>
        <td headers="basic-username">Issue type</td>

        <td headers="basic-username">
          <img
            alt=""
            :src="issueData.issueType.iconUrl"
            width="16"
            height="16"
          />
          {{ issueData.issueType.name }}
        </td>
      </tr>

      <tr>
        <td headers="basic-fname">Resolution</td>

        <td headers="basic-lname">
          {{ issueData.resolution }}
        </td>
      </tr>

      <tr>
        <td headers="basic-username">Labels</td>

        <td headers="basic-username">
          <span
            v-for="label in issueData.labels"
            :key="label"
            class="aui-lozenge aui-lozenge-subtle aui-lozenge-complete"
            style="margin-right: 8px"
          >
            {{ label }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { JiraIssue } from '@/store/modules/issue.types'

import { getLozengeStyle } from '@/helpers/ui'

declare type DestructuredDetails = {
  status: {
    name: string | undefined
    lozengeStyle: string
  }
  issueType: {
    name: string | undefined
    iconUrl: string | undefined
  }
  labels: string[]
  resolution: string | undefined
}

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<JiraIssue>,
      default: () => ({}),
    },
  },

  computed: {
    issueData(): DestructuredDetails {
      const fields = this.data?.fields
      const statusColorName =
        this.data?.fields?.status?.statusCategory?.colorName

      return {
        status: {
          name: fields?.status?.name,
          lozengeStyle: getLozengeStyle(statusColorName),
        },
        issueType: {
          name: fields?.issuetype?.name,
          iconUrl: fields?.issuetype?.iconUrl,
        },
        labels: fields?.labels ?? [],
        resolution: fields?.resolution?.name ?? 'Unresolved',
      }
    },
  },
})
</script>

<style scoped lang="scss"></style>

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
        <td headers="basic-lname">Assignee</td>
        <td headers="basic-username">{{ issueData.assignee }}</td>
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
        <td headers="basic-lname">Reporter</td>

        <td headers="basic-username">
          {{ issueData.reporter.displayName }} -
          {{ issueData.reporter.emailAddress }}
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
  assignee: string
  issueType: {
    name: string | undefined
    iconUrl: string | undefined
  }
  reporter: {
    displayName: string | undefined
    emailAddress: string | undefined
  }
  labels: string[]
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
      const renderedFields = this.data?.renderedFields
      const fields = this.data?.fields
      const statusColorName =
        this.data?.fields?.status?.statusCategory?.colorName

      return {
        status: {
          name: fields?.status?.name,
          lozengeStyle: getLozengeStyle(statusColorName),
        },
        assignee: fields?.assignee?.displayName ?? '-',
        issueType: {
          name: fields?.issuetype?.name,
          iconUrl: fields?.issuetype?.iconUrl,
        },
        reporter: {
          displayName: fields?.reporter?.displayName,
          emailAddress: fields?.reporter?.emailAddress,
        },
        labels: fields?.labels ?? [],
      }
    },
  },
})
</script>

<style scoped lang="scss"></style>

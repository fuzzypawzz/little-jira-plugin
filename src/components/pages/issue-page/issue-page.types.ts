import {
  CommentEntry,
  IssueType,
  IssueLinkEntry,
  Priority,
  Resolution,
  UserInfo,
  SubTaskEntry,
  AttachmentEntry,
} from '@/store/modules/issue.types'

declare type EmptyObject = Record<string, never>
export interface IDestructuredIssueData {
  id: string
  key: string
  assignee: UserInfo | '-'
  created: string | undefined
  updated: string | undefined
  description: string | undefined
  lastUpdated: string | undefined
  attachments: AttachmentEntry[]
  comments: CommentEntry[]
  summary: string | undefined
  issuetype: IssueType | EmptyObject
  issuelinks: IssueLinkEntry[]
  priority: Priority | EmptyObject
  labels: string[]
  reporter: UserInfo | EmptyObject
  resolution: Resolution | EmptyObject
  subtasks: SubTaskEntry[]
}

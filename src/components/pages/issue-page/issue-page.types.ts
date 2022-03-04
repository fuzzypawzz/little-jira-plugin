import {
  CommentEntry,
  IssueType,
  Status,
  IssueLinkEntry,
  Priority,
  UserInfo,
  SubTaskEntry,
  AttachmentEntry,
} from '@/store/modules/issue.types'

export interface IDestructuredIssueData {
  id: string
  key: string
  assignee: UserInfo | '-'
  created: string | undefined
  description: string | undefined
  lastUpdated: string | undefined
  attachments: AttachmentEntry[]
  comments: CommentEntry[]
  summary: string | undefined
  issuetype: IssueType | {}
  issuelinks: IssueLinkEntry[]
  priority: Priority | {}
  labels: string[]
  reporter: UserInfo | {}
  subtasks: SubTaskEntry[]
  status: Status | {}
}

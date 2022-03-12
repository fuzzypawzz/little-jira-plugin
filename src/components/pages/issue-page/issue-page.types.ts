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

declare type EmptyObject = Record<string, never>

declare type EnrichedStatus = Status & {
  lozengeStyle?: string
}

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
  issuetype: IssueType | EmptyObject
  issuelinks: IssueLinkEntry[]
  priority: Priority | EmptyObject
  labels: string[]
  reporter: UserInfo | EmptyObject
  subtasks: SubTaskEntry[]
  status: Partial<EnrichedStatus>
}

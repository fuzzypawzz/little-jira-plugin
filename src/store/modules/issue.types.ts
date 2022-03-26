export declare type JiraIssue = {
  expand: string
  fields: Fields
  id: string
  key: string
  renderedFields?: RenderedFields
  self: string
  // Must be asked for in 'expand'
  names?: {
    assignee: string
    attachment: string
    comment: string
    created: string
    description: string
    issuelinks: string
    issuetype: string
    labels: string
    priority: string
    reporter: string
    status: string
    subtasks: string
    summary: string
    updated: string
  }
}

declare type Fields = {
  issuelinks?: IssueLinkEntry[]
  issuetype?: IssueType
  status?: Status
  summary?: string
  assignee?: UserInfo | null
  attachment?: AttachmentEntry[]
  comment?: {
    comments: CommentEntry[]
    maxResults: number
    startAt: number
    total: number
  }
  created?: string
  description?: string
  labels?: string[]
  priority?: Priority
  reporter?: UserInfo
  resolution?: Resolution
  subtasks?: SubTaskEntry[] | []
  updated?: string
}

export declare type UserInfo = {
  active: boolean
  avatarUrls: {
    '16x16': string
    '24x24': string
    '32x32': string
    '48x48': string
  }
  displayName: string
  emailAddress: string
  key: string
  name: string
  self: string
  timeZone: string
}

export declare type Resolution = {
  description: string
  id: string
  name: string
  self: string
}

export declare type AttachmentEntry = {
  author: UserInfo
  content: string
  created: string
  filename: string
  id: string
  mimeType: string
  self: string
  size: string
  thumbnail: string
}

export declare type CommentEntry = {
  author: UserInfo
  body: string
  created: string
  id: string
  self: string
  updateAuthor: UserInfo
  updated: string
}

export declare type IssueLinkEntry = {
  id: string
  inwardIssue: {
    fields: Fields
    id: string
    key: string
    self: string
  }
  self: string
  type: {
    id: string
    inward: string // example: "is depended on by"
    name: string // example: "Dependent"
    outward: string // example: "Depends on"
    self: string
  }
}

export declare type IssueType = {
  avatarId: string
  description: string
  iconUrl: string
  id: string
  name: string
  self: string
  subtask: boolean
}

export declare type Priority = {
  iconUrl: string
  id: string
  name: string
  self: string
}

export declare type Status = {
  description: string
  iconUrl: string
  id: string
  name: string
  self: string
  statusCategory: {
    colorName: string
    id: string
    key: string
    name: string
    self: string
  }
}

export declare type SubTaskEntry = {
  fields: Fields
  id: string
  key: string
  self: string
}

// TODO: This contains the keys from Fields, but the value types are different
declare type RenderedFields = Fields

/**
 * API Reference
 * https://docs.atlassian.com/software/jira/docs/api/REST/latest/#issue-getIssueWorklog
 */
declare type WorklogEntry = {
  self: string
  author: UserInfo
  updateAuthor: UserInfo
  comment: string
  created: string
  updated: string
  started: string
  timeSpent: string
  timeSpentSeconds: number
  id: string
  issueId: string
}

export declare type Worklog = {
  startAt: number
  maxResults: number
  total: number
  worklogs: WorklogEntry[] | []
}

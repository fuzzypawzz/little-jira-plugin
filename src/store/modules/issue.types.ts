interface IJiraIssue {
  expand: string
  fields: Fields
  id: string
  key: string
  renderedFields?: RenderedFields
  self: string
}

declare type Fields = {
  assignee: UserInfo
  attachment: AttachmentEntry[]
  comment: {
    comments: CommentEntry[]
    maxResults: number
    startAt: number
    total: number
  }
  created: string
  description: string
  issuelinks: IssueLinkEntry[]
  issuetype: IssueType
  labels: string[]
  priority: Priority
  reporter: UserInfo
  status: Status
  subtasks: SubTaskEntry[]
  summary: string
  updated: string
}

declare type UserInfo = {
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

declare type AttachmentEntry = {
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

declare type CommentEntry = {
  author: UserInfo
  body: string
  created: string
  id: string
  self: string
  updateAuthor: UserInfo
  updated: string
}

declare type IssueLinkEntry = {
  id: string
  inwardIssue: {
    fields: Pick<Fields, 'issuetype' | 'priority' | 'status' | 'summary'>
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

declare type IssueType = {
  avatarId: string
  description: string
  iconUrl: string
  id: string
  name: string
  self: string
  subtask: boolean
}

declare type Priority = {
  iconUrl: string
  id: string
  name: string
  self: string
}

declare type Status = {
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

declare type SubTaskEntry = {
  fields: Pick<Fields, 'issuetype' | 'priority' | 'status' | 'summary'>
  id: string
  key: string
  self: string
}

declare type RenderedFields = Partial<Fields>

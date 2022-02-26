import content from 'webextension-polyfill'

interface ISettings {
  method?: string
  headers?: any
  body?: any
  mode?: string
  'same-origin'?: string
  cache?: string | undefined
}

export default (url: string, settings: ISettings): Promise<Response> => {
  /**
   * Note: In Firefox, extensions that need to perform requests that behave as if
   * they were sent by the content itself can use content.XMLHttpRequest
   * and content.fetch() instead.
   */
  const fetchAction = (content as any).fetch ?? fetch

  return fetchAction(url, settings)
}

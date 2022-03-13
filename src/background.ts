import { LOCAL_STORAGE_KEYS } from '@/constants/storage'

let portFromCS: any
let jiraUrl: ''

// TODO: Handle errors and scenario where jiraUrl is not set
// UI Should probably display an error if possible so early in the process.
browser.storage.sync.get([LOCAL_STORAGE_KEYS.JIRA_URL]).then((storageData) => {
  jiraUrl = storageData[LOCAL_STORAGE_KEYS.JIRA_URL]
})

/**
 *
 * @param {object} port Port to listen to
 */
function connected(port: any) {
  portFromCS = port
  portFromCS.onMessage.addListener(function (message: any) {
    if (message.issue) portFromCS.postMessage({ issueData: message.issue })

    if (message.jqlResponse)
      portFromCS.postMessage({
        jqlResponse: message.jqlResponse,
      })

    if (message.userData) portFromCS.postMessage({ userData: message.userData })
  })
}

/**
 *
 * @param {object} tabId
 * @param {object} changeInfo
 * @param {object} tabInfo
 */
function handleUpdated(tabId: any, changeInfo: any, tab: any) {
  if (!jiraUrl) return

  if (changeInfo?.status === 'complete' && tab?.url.includes(jiraUrl)) {
    // TODO: Handle errors
    browser.tabs.insertCSS({
      file: '/css/content-script.css',
    })

    browser.tabs.executeScript({
      file: 'browser-polyfill.js',
    })

    browser.tabs.executeScript({
      file: '/js/content-script.js',
    })
  }
}

browser.runtime.onConnect.addListener(connected)

/**
 * Since filters are not working in Chrome,
 * we need to check the url in the callback.
 * Firefox interface: browser.tabs.onUpdated.addListener(handleUpdated, filter)
 */
browser.tabs.onUpdated.addListener(handleUpdated)

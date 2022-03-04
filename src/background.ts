// import browser from 'webextension-polyfill'

let portFromCS: any

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
  // TODO: Refactor this to be nicer and URL should come from settings
  const url = 'jira.atlassian.teliacompany.net'

  if (changeInfo?.status === 'complete' && tab?.url.includes(url)) {
    console.log(tab)
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
// TODO: Get filter from storage
// const filter = {
//   urls: ['https://jira.atlassian.teliacompany.net/*'],
// }
// TODO: Remove this and write a description that filters are not available
// in chrome, so we need to check the url in the callback
// Firefox: browser.tabs.onUpdated.addListener(handleUpdated, filter)
browser.tabs.onUpdated.addListener(handleUpdated)

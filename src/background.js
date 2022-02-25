let portFromCS;

/**
 *
 * @param {object} port Port to listen to
 */
function connected(port) {
	portFromCS = port;
	portFromCS.onMessage.addListener(function(message) {
		if (message.issue) portFromCS.postMessage({ issueData: message.issue });

		if (message.jqlResponse)
			portFromCS.postMessage({
				jqlResponse: message.jqlResponse,
			});

		if (message.userData)
			portFromCS.postMessage({ userData: message.userData });
	});
}

/**
 *
 * @param {object} tabId
 * @param {object} changeInfo
 * @param {object} tabInfo
 */
function handleUpdated(tabId, changeInfo) {
	if (changeInfo && changeInfo.status === "complete") {
		// TODO: Handle errors
		browser.tabs.insertCSS({
			file: "/css/content-script.css",
		});

		browser.tabs.executeScript({
			file: "/js/content-script.js",
		});
	}
}

browser.runtime.onConnect.addListener(connected);
// TODO: Get filter from storage
const filter = {
	urls: ["https://jira.atlassian.teliacompany.net/*"],
};
browser.tabs.onUpdated.addListener(handleUpdated, filter);

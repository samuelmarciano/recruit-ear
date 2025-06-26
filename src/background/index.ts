chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.setOptions({
    tabId: tab.id,
    path: "sidePanel.html",
    enabled: true
  })
  chrome.sidePanel.open({ tabId: tab.id })
})

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  chrome.sidePanel.setOptions({ enabled: false })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.sidePanel.setOptions({ tabId, enabled: false })
  }
})

function handleTabCreatedOrUpdated(tab: chrome.tabs.Tab): void {
  chrome.storage.sync.get("isEnabled").then((result) => {
    const { isEnabled } = result;
    setIconColor(tab, isEnabled);
    runContentScript(tab, isEnabled);
  });
}

function setIconColor(tab: chrome.tabs.Tab, isEnabled: boolean): void {
  chrome.action.setIcon({
    tabId: tab.id,
    path: isEnabled ? "./icon128--on.png" : "./icon128--off.png",
  });
}

function runContentScript(tab: chrome.tabs.Tab, isEnabled: boolean): void {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, isEnabled);
  }
}

// Runs when the extension is first installed, when the extension is updated to a new version, and
// when Chrome is updated to a new version.
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("threads").then((result) => {
    if (!Object.keys(result).length) {
      chrome.storage.sync.set({ threads: {} });
    }
  });
  chrome.storage.sync.set({ isEnabled: false }); // Install turned off...
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      setIconColor(tab, false); // ... and with icon set to the off version
    });
  });
});

// Runs for new tabs
chrome.tabs.onCreated.addListener((tab) => {
  handleTabCreatedOrUpdated(tab);
});

// Runs when the URL for a tab changes
chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, tab) => {
  handleTabCreatedOrUpdated(tab);
});

chrome.action.onClicked.addListener(() => {
  chrome.storage.sync.get("isEnabled").then((result) => {
    const nextIsEnabled = !result.isEnabled;

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        runContentScript(tab, nextIsEnabled);
        setIconColor(tab, nextIsEnabled);
      });
    });

    chrome.storage.sync.set({ isEnabled: nextIsEnabled });
  });
});

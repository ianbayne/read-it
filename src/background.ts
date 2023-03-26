let enabled = false;

chrome.action.onClicked.addListener((tab) => {
  enabled = !enabled;

  const redditCommentsUrlRegex = /^https:\/\/old.reddit.com\/r\/.+\/comments\//;
  // `regex.text(string)` is more performant than `text.match(regex)`
  if (tab.url && redditCommentsUrlRegex.test(tab.url)) {
    chrome.tabs.sendMessage(tab.id as number, { enabled });
  }
});

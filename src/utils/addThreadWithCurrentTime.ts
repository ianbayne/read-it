export default function addThreadWithCurrentTime(
  threadId: string,
  currentTime: Date
): void {
  chrome.storage.sync.get("threads").then(({ threads }) => {
    chrome.storage.sync.set({
      threads: {
        ...threads,
        // [threadId]: { lastTimeVisited: new Date().toISOString() },
        [threadId]: { lastTimeVisited: currentTime },
      },
    });
  });
}

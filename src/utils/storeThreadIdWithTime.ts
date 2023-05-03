export default function storeThreadIdWithTime(
  threadId: string,
  currentTime: Date
): void {
  const currentTimeString = currentTime.toISOString();
  chrome.storage.sync.get("threads").then(({ threads }) => {
    chrome.storage.sync.set({
      threads: {
        ...threads,
        [threadId]: { lastTimeVisited: currentTimeString },
      },
    });
  });
}

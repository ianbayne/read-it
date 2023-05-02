import addThreadWithCurrentTime from "./utils/addThreadWithCurrentTime";
import markNewComments from "./utils/markNewComments";

async function run(): Promise<void> {
  // Get thread ID
  const url = window.location.href;
  const threadId = url.match(/comments\/([^/]+)\/.+/)?.[1];
  if (!threadId) {
    return;
  }

  // Check if thread is in history
  chrome.storage.sync.get("threads").then(({ threads }) => {
    const thread = threads[threadId];
    const now = new Date();
    if (!thread) {
      // If the threadId is not present in storage, the user has never visited this thread before
      // and therefore all comments must be new
      markNewComments();
    } else {
      // If the threadId _is_ present in storage, check comments against the current time
      markNewComments(now);
    }
    // Update the thread's lastTimeVisited
    addThreadWithCurrentTime(threadId, now);
  });
}

chrome.runtime.onMessage.addListener((isEnabled, _sender, _sendResponse) => {
  if (isEnabled) {
    run();
  }
});

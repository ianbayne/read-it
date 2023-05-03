import RedditThread from "./RedditThread";
import storeThreadIdWithTime from "./utils/storeThreadIdWithTime";
import highlightNewComments from "./utils/highlightNewComments";
import removeHighlights from "./utils/removeHighlights";

async function run(): Promise<void> {
  // Get thread ID
  const url = window.location.href;
  const threadId = url.match(/comments\/([^/]+)\/.+/)?.[1];
  if (!threadId) {
    return;
  }

  const thread = new RedditThread(threadId);
  const lastTimeVisited = await thread.lastTimeVisitedAsync();
  const now = new Date();
  if (lastTimeVisited) {
    // The thread has been visited before so only highlight new comments
    highlightNewComments(now);
  } else {
    // It's the first time visiting the thread so highlight all comments
    highlightNewComments();
  }
  // Update the thread's lastTimeVisited
  storeThreadIdWithTime(thread.threadId, now);
}

chrome.runtime.onMessage.addListener((isEnabled, _sender, _sendResponse) => {
  if (isEnabled) {
    run();
  } else {
    removeHighlights();
  }
});

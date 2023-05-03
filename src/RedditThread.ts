import Threads from "./types/Threads";

class RedditThread {
  threadId: string;

  constructor(threadId: string) {
    this.threadId = threadId;
  }

  async lastTimeVisitedAsync(): Promise<string | undefined> {
    const { threads } = await (<Promise<{ threads: Threads }>>(
      chrome.storage.sync.get("threads")
    ));
    return threads[this.threadId]?.lastTimeVisited;
  }
}

export default RedditThread;

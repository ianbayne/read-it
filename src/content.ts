const DATE_TIME = "2023-03-26T01:01:09+00:00";

function run(): void {
  const commentTimeElements = document.querySelectorAll(
    "time.live-timestamp"
  ) as NodeListOf<HTMLTimeElement>;
  const dateTimeToCheckAgainst = new Date(DATE_TIME);

  const commentTimeElementsAfterTimeConstant = Array.from(
    commentTimeElements
  ).filter((commentTimeElement) => {
    const commentDateTimeString = commentTimeElement?.getAttribute("datetime");
    if (commentDateTimeString) {
      const commentDateTime = new Date(commentDateTimeString);
      return commentDateTime > dateTimeToCheckAgainst;
    }
  });

  const comments = commentTimeElementsAfterTimeConstant.map(
    (commentTimeElementAfterTimeConstant) =>
      commentTimeElementAfterTimeConstant.closest(".comment")
  ) as HTMLElement[];

  comments.forEach((comment) => {
    if (comment) {
      comment.style.backgroundColor = "#fef0f3";
    }
  });
}

chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request.enabled) {
    run();
  }
});

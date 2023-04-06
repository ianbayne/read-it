function run(dateTime: string): void {
  const commentTimeElements = document.querySelectorAll(
    "time.live-timestamp"
  ) as NodeListOf<HTMLTimeElement>;
  const dateTimeToCheckAgainst = new Date(dateTime);

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
  if (request.selectedDateTime) {
    run(request.selectedDateTime);
  }
});

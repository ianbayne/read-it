import isTruthy from "./isTruthy";

const NEW_COMMENT_HIGHLIGHT_COLOR = "#fef0f3";
const BUFFER_IN_MILLISECONDS = 1000 * 60 * 5;

function highlightNewComments(comments: HTMLElement[]): void {
  comments.forEach((comment) => {
    comment.style.backgroundColor = NEW_COMMENT_HIGHLIGHT_COLOR;
  });
}

export default function markNewComments(
  dateTimeToCheckAgainst = new Date(0)
): void {
  const dateTimeToCheckAgainstInMs = dateTimeToCheckAgainst.getTime();
  const dateTimeToCheckAgainstPlusBuffer = new Date(
    dateTimeToCheckAgainstInMs + BUFFER_IN_MILLISECONDS
  );
  const allCommentTimeElements = document.querySelectorAll<HTMLElement>(
    "time.live-timestamp"
  );
  const newCommentTimeElements = Array.from(allCommentTimeElements).filter(
    (commentTimeElement) => {
      const commentDateTimeString = commentTimeElement.getAttribute("datetime");
      if (commentDateTimeString) {
        const commentDateTime = new Date(commentDateTimeString);
        return commentDateTime > dateTimeToCheckAgainstPlusBuffer;
      }
    }
  );

  const newComments = newCommentTimeElements
    .map((newCommentTimeElement) =>
      newCommentTimeElement.closest<HTMLElement>(".comment")
    )
    .filter(isTruthy);

  if (newComments.length) {
    highlightNewComments(newComments);
  }
}

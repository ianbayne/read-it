import {
  BUFFER_IN_MILLISECONDS,
  NEW_COMMENT_HIGHLIGHT_COLOR,
} from "../constants";
import isTruthy from "./isTruthy";

function addHighlight(comments: HTMLElement[]): void {
  comments.forEach((comment) => {
    comment.style.backgroundColor = NEW_COMMENT_HIGHLIGHT_COLOR;
  });
}

// TODO: Should this take a date string instead?
export default function highlightNewComments(
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
    addHighlight(newComments);
  }
}

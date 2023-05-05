import {
  BUFFER_IN_MILLISECONDS,
  HIGHLIGHT_CLASS_NAME,
  HIGHLIGHT_COLOR,
} from "../constants";
import isTruthy from "./isTruthy";

function addHighlight(comments: HTMLElement[]): void {
  comments.forEach((comment) => {
    // Reddit has `!important` set on the comments' background-color property, so it's easier to set the background color explicitly
    // with JavaScript instead of using classes to change the styling
    comment.style.setProperty("background-color", HIGHLIGHT_COLOR, "important");
    comment.classList.add(HIGHLIGHT_CLASS_NAME); // Class name added so highlighted comments can be easily querySelectAll-ed for later removal
  });
}

export default function highlightNewComments(
  dateTimeToCheckAgainst = new Date(0)
): void {
  const dateTimeToCheckAgainstInMs = dateTimeToCheckAgainst.getTime();
  const dateTimeStringToCheckAgainstWithBuffer = new Date(
    dateTimeToCheckAgainstInMs - BUFFER_IN_MILLISECONDS
  ).toISOString();
  const allCommentTimeElements = document.querySelectorAll<HTMLElement>(
    "time.live-timestamp"
  );
  const newCommentTimeElements = Array.from(allCommentTimeElements).filter(
    (commentTimeElement) => {
      const commentDateTimeString = commentTimeElement.getAttribute("datetime");
      if (commentDateTimeString) {
        return commentDateTimeString >= dateTimeStringToCheckAgainstWithBuffer;
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

import { HIGHLIGHT_CLASS_NAME } from "../constants";

export default function removeHighlights(): void {
  const highlightedComments = document.querySelectorAll(
    `.comment.${HIGHLIGHT_CLASS_NAME}`
  ) as NodeListOf<HTMLElement>;
  highlightedComments.forEach((highlightedComment) => {
    highlightedComment.style.backgroundColor = "";
  });
}

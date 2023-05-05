import { HIGHLIGHT_CLASS_NAME } from "../constants";

export default function removeHighlights(): void {
  const highlightedComments = <NodeListOf<HTMLElement>>(
    document.querySelectorAll(`.comment.${HIGHLIGHT_CLASS_NAME}`)
  );
  highlightedComments.forEach((highlightedComment) => {
    highlightedComment.style.backgroundColor = "";
  });
}

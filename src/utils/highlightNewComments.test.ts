/**
 * @jest-environment jsdom // REF: https://jestjs.io/docs/configuration#testenvironment-string
 */

import { describe, expect, it } from "@jest/globals";

import highlightNewComments from "./highlightNewComments";
import { NEW_COMMENT_HIGHLIGHT_COLOR } from "../constants";

describe("highlightNewComments()", () => {
  it("when not passed an argument, highlights all comments ", () => {
    const timeForFirstComment = new Date().toISOString();
    const timeForSecondComment = new Date().toISOString();

    document.body.innerHTML = simplifiedDom(
      timeForFirstComment,
      timeForSecondComment
    );

    highlightNewComments();

    const comments = document.querySelectorAll(
      ".comment"
    ) as NodeListOf<HTMLElement>;

    const highlightedComments = [];
    comments.forEach((comment) => {
      if (comment.style.backgroundColor === NEW_COMMENT_HIGHLIGHT_COLOR) {
        highlightedComments.push(comment);
      }
    });
    expect(highlightedComments.length).toBe(2);
  });

  it("when passed a date string, highlights only comments newer than that date string (plus the five minute buffer)", () => {
    const thirtyMinutesAgo = new Date().getTime() - 1000 * 60 * 30;
    const timeForFirstComment = new Date().toISOString();
    const timeForSecondComment = new Date(thirtyMinutesAgo).toISOString();

    document.body.innerHTML = simplifiedDom(
      timeForFirstComment,
      timeForSecondComment
    );

    const tenMinutesAgo = new Date(new Date().getTime() - 1000 * 60 * 10);
    highlightNewComments(tenMinutesAgo);

    const comments = document.querySelectorAll(
      ".comment"
    ) as NodeListOf<HTMLElement>;

    const highlightedComments = [];
    comments.forEach((comment) => {
      if (comment.style.backgroundColor === NEW_COMMENT_HIGHLIGHT_COLOR) {
        highlightedComments.push(comment);
      }
    });
    expect(highlightedComments.length).toBe(1);
  });
});

function simplifiedDom(
  timeForFirstComment: string,
  timeForSecondComment: string
): string {
  return `<div \
class='comment' \
> \
<div class='entry'> \
  <p> \
    <time \
      datetime='${timeForFirstComment}' \
      class='live-timestamp' \
      ></time \
    > \
  </p> \
  <form> \
    <div> \
      <div> \
        <p> \
          Test comment \
        </p> \
      </div> \
    </div> \
  </form> \
</div> \
</div> \
<div \
class='comment' \
> \
<div> \
  <p> \
    <time \
      datetime='${timeForSecondComment}' \
      class='live-timestamp' \
      ></time \
    > \
  </p> \
  <form> \
    <div> \
      <div> \
        <p> \
          Another test comment
        </p> \
      </div> \
    </div> \
  </form> \
</div> \
</div>`;
}

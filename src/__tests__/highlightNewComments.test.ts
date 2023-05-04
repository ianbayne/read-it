/**
 * @jest-environment jsdom // REF: https://jestjs.io/docs/configuration#testenvironment-string
 */

import { describe, expect, it } from "@jest/globals";

import highlightNewComments from "../utils/highlightNewComments";
import { BUFFER_IN_MILLISECONDS } from "../constants";

describe("highlightNewComments()", () => {
  it("when not passed an argument, highlights all comments ", () => {
    const timeForFirstComment = new Date().toISOString();
    const timeForSecondComment = new Date().toISOString();

    document.body.innerHTML = simplifiedDom(
      timeForFirstComment,
      timeForSecondComment
    );

    highlightNewComments();

    const highlightedComments = document.querySelectorAll(
      ".comment.chrome-extension__highlight"
    );

    expect(highlightedComments.length).toBe(2);
    highlightedComments.forEach((highlightedComment) => {
      const backgroundColor =
        getComputedStyle(highlightedComment).getPropertyValue(
          "background-color"
        );
      expect(backgroundColor).toBe("rgb(254, 240, 243)");
    });
  });

  it("when passed a date string, highlights only comments newer than that date string (taking into consideration the buffer)", () => {
    const timeForFirstComment = new Date(
      new Date().getTime() - BUFFER_IN_MILLISECONDS / 2
    ).toISOString();
    const timeForSecondComment = new Date(
      new Date().getTime() - BUFFER_IN_MILLISECONDS * 2
    ).toISOString();

    document.body.innerHTML = simplifiedDom(
      timeForFirstComment,
      timeForSecondComment
    );

    const now = new Date();
    highlightNewComments(now);

    const highlightedComments = document.querySelectorAll(
      ".comment.chrome-extension__highlight"
    );

    expect(highlightedComments.length).toBe(1);
    highlightedComments.forEach((highlightedComment) => {
      const backgroundColor =
        getComputedStyle(highlightedComment).getPropertyValue(
          "background-color"
        );
      expect(backgroundColor).toBe("rgb(254, 240, 243)");
    });
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

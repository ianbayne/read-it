import { describe, expect, it } from "@jest/globals";

import isTruthy from "./isTruthy";

describe("isTruthy()", () => {
  it("returns false for empty strings, undefined, null, and false", () => {
    expect(isTruthy("")).toBe(false);
    expect(isTruthy(undefined)).toBe(false);
    expect(isTruthy(null)).toBe(false);
    expect(isTruthy(false)).toBe(false);
  });

  it("returns true for all else", () => {
    expect(isTruthy(true)).toBe(true);
    expect(isTruthy("true")).toBe(true);
    expect(isTruthy(42)).toBe(true);
  });
});

// REF: https://stackoverflow.com/a/74902750
export default function isTruthy<T>(
  arg: T | undefined | null | false
): arg is T {
  return !!arg;
}

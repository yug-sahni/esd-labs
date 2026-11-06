// Section 06 — Scope and closures

export function createIdGenerator(prefix) {
  let count = 0;

  return function () {
    count++;
    return `${prefix}-${count}`;
  };
}

export function makeCreditCheck(limit) {
  return function (credits) {
    return credits <= limit;
  };
}

export function createBox(initial) {
  let value = initial;

  function get() {
    return value;
  }

  function set(newValue) {
    value = newValue;
  }

  return [get, set];
}
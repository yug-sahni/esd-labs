// Section 05 — Callbacks and higher-order functions

export function countWhere(list, predicate) {
  let count = 0;

  for (const item of list) {
    if (predicate(item)) {
      count++;
    }
  }

  return count;
}

export function byField(field) {
  return (a, b) => {
    if (a[field] < b[field]) return -1;
    if (a[field] > b[field]) return 1;
    return 0;
  };
}

export function applyUpdate(current, update) {
  if (typeof update === "function") {
    return update(current);
  }

  return update;
}

export function applyAll(start, updates) {
  let result = start;

  for (const update of updates) {
    result = applyUpdate(result, update);
  }

  return result;
}
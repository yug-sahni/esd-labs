// Section 15 — Build your own useState

export function useState(initial, onChange) {
  let state = initial;

  function getState() {
    return state;
  }

  function setState(next) {
    const newValue =
      typeof next === "function" ? next(state) : next;

    if (Object.is(state, newValue)) {
      return;
    }

    state = newValue;
    onChange();
  }

  return [getState, setState];
}
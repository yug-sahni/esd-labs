
// Section 03 — Asynchronous JavaScript and promises

// A promise that resolves (with no value) after `ms` milliseconds.
export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Run tasks ONE AFTER ANOTHER.
export async function inOrder(tasks) {
  const results = [];

  for (const task of tasks) {
    const result = await task();
    results.push(result);
  }

  return results;
}

// Start ALL tasks AT ONCE and wait for all of them.
export function allAtOnce(tasks) {
  return Promise.all(tasks.map((task) => task()));
}

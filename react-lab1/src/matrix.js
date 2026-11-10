// Plain functions on the matrix: no React in this file, so the tests can check them
// with one line each. A matrix is an array of rows; each row is an array of numbers.
//
//   [[1, 2, 3],
//    [4, 5, 6],      matrix[1][2] is row 1, column 2 (counting from 0) → 6
//    [7, 8, 9]]

// The numbers the app starts with (section 07). Given.
export const START = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Section 08 (+ 12) — a NEW matrix with one cell increased by `step` (1 by default).
export function incrementAt(matrix, row, col, step = 1) {
  return matrix.map((r, i) =>
    i === row ? r.map((value, j) => (j === col ? value + step : value)) : r
  );
}

// Section 09 — numbers worked out from the matrix, never stored.
export function stats(matrix) {
  const values = matrix.flat();
  const cells = values.length;
  const sum = values.reduce((total, value) => total + value, 0);

  return {
    sum,
    average: cells === 0 ? 0 : sum / cells,
    max: cells === 0 ? 0 : Math.max(...values),
    nonZero: values.filter((value) => value !== 0).length,
  };
}

// Section 12 (stretch) — the same shape, every cell 0.
export function zeros(matrix) {
  return matrix.map((r) => r.map(() => 0));
}

// IN-LAB — one less, never below 0. A 0 stays 0 and the SAME matrix comes back.
export function decrementAt(matrix, row, col) {
  if (matrix[row][col] === 0) return matrix;

  return matrix.map((r, i) =>
    i === row ? r.map((value, j) => (j === col ? value - 1 : value)) : r
  );
}
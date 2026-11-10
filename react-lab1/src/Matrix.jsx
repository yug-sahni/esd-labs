import Cell from "./Cell.jsx";

export default function Matrix({ matrix, onIncrement, onDecrement }) {
  const max = Math.max(0, ...matrix.flat());

  return (
    <table className="matrix">
      <tbody>
        {matrix.map((rowValues, row) => (
          <tr key={row}>
            {rowValues.map((value, col) => (
              <td key={col}>
                <Cell
                  row={row}
                  col={col}
                  value={value}
                  isMax={max > 0 && value === max}
                  onClick={() => onIncrement(row, col)}
                  onDecrement={() => onDecrement(row, col)}
                />
              </td>
            ))}
            <td className="total" aria-label={`Row ${row + 1} total`}>
              {rowValues.reduce((sum, value) => sum + value, 0)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
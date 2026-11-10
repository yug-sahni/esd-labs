export default function Cell({ row, col, value, onClick, onDecrement, isMax = false }) {
  return (
    <button
      className={isMax ? "cell max" : "cell"}
      aria-label={`Row ${row + 1}, column ${col + 1}: ${value}`}
      onClick={onClick}
      onContextMenu={(event) => {
        event.preventDefault();
        onDecrement();
      }}
    >
      {value}
    </button>
  );
}
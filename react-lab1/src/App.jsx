import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Matrix from "./Matrix.jsx";
import Stats from "./Stats.jsx";
import { START, incrementAt, decrementAt, zeros } from "./matrix.js";

export default function App() {
  const [matrix, setMatrix] = useState(START);
  const [step, setStep] = useState(1);

  useEffect(() => {
    fetch("/matrix.json")
      .then((response) => response.json())
      .then((data) => setMatrix(data));
  }, []);

  const increment = (row, col) => setMatrix((m) => incrementAt(m, row, col, step));
  const decrement = (row, col) => setMatrix((m) => decrementAt(m, row, col));
  const reset = () => setMatrix((m) => zeros(m));

  return (
    <main className="app">
      <Header />
      <label>
        Step
        <input
          type="number"
          value={step}
          onChange={(event) => setStep(Number(event.target.value))}
        />
      </label>
      <button type="button" onClick={reset}>Reset</button>
      <Matrix matrix={matrix} onIncrement={increment} onDecrement={decrement} />
      <Stats matrix={matrix} />
    </main>
  );
}
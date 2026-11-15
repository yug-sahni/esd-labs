// STRETCH (pre-lab section 06) — useDebounced(value, ms)
import { useEffect, useState } from "react";

export function useDebounced(value, ms) {
  const [settled, setSettled] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setSettled(value), ms);
    return () => clearTimeout(timer);
  }, [value, ms]);

  return settled;
}
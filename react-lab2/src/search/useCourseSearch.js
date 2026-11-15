// Pre-lab section 05 — an effect that fetches: dependencies and cleanup.
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client.js";

export function useCourseSearch(query) {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "ready" | "error"

  const trimmed = query.trim();

  useEffect(() => {
    // A blank query sends no request.
    if (trimmed === "") {
      setResults([]);
      setStatus("idle");
      return;
    }

    // The cleanup sets this, so an answer to an older query is dropped.
    let ignore = false;
    setStatus("loading");

    const params = new URLSearchParams({ q: trimmed });
    apiFetch(`/api/courses?${params}`)
      .then((courses) => {
        if (ignore) return;
        setResults(courses);
        setStatus("ready");
      })
      .catch(() => {
        if (ignore) return;
        setResults([]);
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [trimmed]);

  return { results, status };
}
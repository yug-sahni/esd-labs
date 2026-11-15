// The hook: fetch and logic for the Courses page (CONTRACT.md §4).
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client.js";

const byCode = (a, b) => (a.code < b.code ? -1 : a.code > b.code ? 1 : 0);

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [error, setError] = useState(null);

  // Load the list once, when the page appears. The cleanup drops a stale answer
  // (StrictMode runs this effect twice in development).
  useEffect(() => {
    let ignore = false;

    apiFetch("/api/courses")
      .then((list) => {
        if (ignore) return;
        setCourses(list);
        setStatus("ready");
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, []);

  // POST the course, then put the 201 body into the list, sorted by code.
  // A failure is NOT caught here: the ApiError goes up to the form, which shows it.
  async function addCourse(courseRequest) {
    const created = await apiFetch("/api/courses", { method: "POST", body: courseRequest });
    setCourses((current) => [...current, created].sort(byCode));
    return created;
  }

  return { courses, status, error, addCourse };
}
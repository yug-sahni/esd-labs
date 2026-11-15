// Pre-lab section 06 — a controlled input, and the pieces put together.
import { useState } from "react";
import { useCourseSearch } from "./useCourseSearch.js";
import { useDebounced } from "./useDebounced.js";
import { SearchResults } from "./SearchResults.jsx";

export function CourseSearch() {
  const [query, setQuery] = useState("");
  const { results, status } = useCourseSearch(useDebounced(query, 250));

  return (
    <section className="course-search">
      <h2>Search the catalogue</h2>
      <label htmlFor="course-search">Search courses</label>
      <input
        id="course-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <SearchResults results={results} status={status} />
    </section>
  );
}
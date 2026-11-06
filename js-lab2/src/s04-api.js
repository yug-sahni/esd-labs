
// Section 04 — fetch and the network

// Build the URL for GET /api/courses with optional filters.
export function buildCoursesUrl({ department = "", q = "" } = {}) {
  const params = new URLSearchParams();

  if (department.trim()) {
    params.set("department", department);
  }

  if (q.trim()) {
    params.set("q", q);
  }

  const query = params.toString();

  return query ? `/api/courses?${query}` : "/api/courses";
}

// GET a URL and return the parsed JSON body.
export async function getJSON(url, fetchFn = fetch) {
  const response = await fetchFn(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

// The courses matching some filters.
export function fetchCourses(filters, fetchFn = fetch) {
  return getJSON(buildCoursesUrl(filters), fetchFn);
}

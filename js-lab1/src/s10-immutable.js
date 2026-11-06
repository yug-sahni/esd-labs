// Section 10 — Immutable updates (the planner)

export function addToPlanner(planner, courseId) {
  if (planner.includes(courseId)) {
    return planner;
  }

  return [...planner, courseId];
}

export function removeFromPlanner(planner, courseId) {
  if (!planner.includes(courseId)) {
    return planner;
  }

  return planner.filter((id) => id !== courseId);
}

export function updateCourse(course, changes) {
  return {
    ...course,
    ...changes,
  };
}

export function takeSeat(courses, courseId) {
  const course = courses.find((c) => c.id === courseId);

  if (!course || course.seatsLeft === 0) {
    return courses;
  }

  return courses.map((c) =>
    c.id === courseId
      ? { ...c, seatsLeft: c.seatsLeft - 1 }
      : c
  );
}
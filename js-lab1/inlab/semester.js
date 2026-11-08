export function addToSemester(plan, semester, courseId) {
  const current = plan.semesters[semester] ?? [];

  if (current.includes(courseId)) return plan;

  return {
    ...plan,
    semesters: {
      ...plan.semesters,
      [semester]: [...current, courseId],
    },
  };
}

export function moveCourse(plan, from, to, courseId) {
  const source = plan.semesters[from] ?? [];

  if (!source.includes(courseId)) return plan;
  if (from === to) return plan;

  const target = plan.semesters[to] ?? [];

  return {
    ...plan,
    semesters: {
      ...plan.semesters,
      [from]: source.filter((id) => id !== courseId),
      [to]: target.includes(courseId) ? target : [...target, courseId],
    },
  };
}
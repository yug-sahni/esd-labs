// Section 04 — Functions are values

export const toCardView = (course) => ({
  id: course.id,
  heading: `${course.code} · ${course.title}`,
  meta: `${course.credits} credits · ${course.department}`,
  isFull: course.seatsLeft === 0,
});

export function buildButtons(courses, onAdd) {
  return courses.map((course) => ({
    label: `Add ${course.code}`,
    onClick: () => onAdd(course.id),
  }));
}
// Section 03 — Values, truthiness and expressions

export function seatLabel(course) {
  if (course.seatsLeft === 0) {
    return "Full";
  }

  if (course.seatsLeft === 1) {
    return "1 seat left";
  }

  return `${course.seatsLeft} seats left`;
}

export function descriptionOrDefault(course) {
  return course.description ?? "No description yet.";
}

export function plannerBadge(count) {
  return count > 0 ? `${count} in planner` : null;
}
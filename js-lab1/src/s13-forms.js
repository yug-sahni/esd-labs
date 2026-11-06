// Section 13 — the pure half of the form exercise

export function isComplete(values) {
  const { code, title, department, credits } = values;

  if (!code.trim() || !title.trim() || !department.trim()) {
    return false;
  }

  const numberOfCredits = Number(credits);

  if (
    !Number.isInteger(numberOfCredits) ||
    numberOfCredits < 1 ||
    numberOfCredits > 6
  ) {
    return false;
  }

  return true;
}

export function toCourse(values, nextId) {
  return {
    id: nextId(),
    code: values.code.trim().toUpperCase(),
    title: values.title.trim(),
    description: null,
    department: values.department.trim(),
    credits: Number(values.credits),
    capacity: 60,
    seatsLeft: 60,
  };
}
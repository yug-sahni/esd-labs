// Section 11 — The array toolkit for UIs
import { toCardView } from "./s04-functions.js";
import { byField } from "./s05-higher-order.js";

export function byDepartment(courses, department) {
  return courses.filter(
    (course) =>
      course.department.toLowerCase() === department.toLowerCase()
  );
}

export function openOnly(courses) {
  return courses.filter((course) => course.seatsLeft > 0);
}

export function searchCourses(courses, query) {
  const search = query.trim().toLowerCase();

  if (search === "") return courses;

  return courses.filter(
    (course) =>
      course.code.toLowerCase().includes(search) ||
      course.title.toLowerCase().includes(search)
  );
}

export function findByCode(courses, code) {
  return courses.find(
    (course) => course.code.toLowerCase() === code.toLowerCase()
  );
}

export function totalCredits(courses) {
  return courses.reduce((total, course) => total + course.credits, 0);
}

export function countByDepartment(courses) {
  return courses.reduce((result, course) => {
    result[course.department] = (result[course.department] || 0) + 1;
    return result;
  }, {});
}

export function departments(courses) {
  return [...new Set(courses.map((course) => course.department))].sort();
}

export function sortedBy(courses, field) {
  return [...courses].sort(byField(field));
}

export function anyFull(courses) {
  return courses.some((course) => course.seatsLeft === 0);
}

export function allHaveSeats(courses, n = 1) {
  return courses.every((course) => course.seatsLeft >= n);
}

export function courseCards(courses, department) {
  return byDepartment(courses, department)
    .filter((course) => course.seatsLeft > 0)
    .sort(byField("code"))
    .map(toCardView);
}

export function plannerCourses(planner, courses) {
  return planner
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean);
}

export function plannerCredits(planner, courses) {
  return plannerCourses(planner, courses).reduce(
    (total, course) => total + course.credits,
    0
  );
}

export function canAdd(planner, courses, courseId, limit = 24) {
  const course = courses.find((item) => item.id === courseId);

  if (!course) return false;
  if (course.seatsLeft === 0) return false;
  if (planner.includes(courseId)) return false;

  return plannerCredits(planner, courses) + course.credits <= limit;
}
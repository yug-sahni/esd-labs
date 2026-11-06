// Sections 12–13 — Add a course form

import { courses } from "../data/courses.js";
import { departments } from "../src/s11-catalog.js";
import { isComplete, toCourse } from "../src/s13-forms.js";

const form = document.querySelector("#add-course");
const fields = Array.from(form.querySelectorAll("input, select"));
const submit = form.querySelector('button[type="submit"]');
const departmentSelect = form.querySelector('[name="department"]');
const list = document.querySelector("#course-list");
const count = document.querySelector("#count");
const status = document.querySelector("#status");

const nextId = (() => {
  let last = 20;
  return () => ++last;
})();

// Fill department dropdown
departments(courses).forEach((name) => {
  departmentSelect.add(new Option(name, name));
});

// Read form values
function readForm() {
  return fields.reduce((values, field) => {
    values[field.name] = field.value;
    return values;
  }, {});
}

// Enable button only when form is complete
form.addEventListener("input", () => {
  submit.disabled = !isComplete(readForm());
});

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = readForm();

  if (!isComplete(values)) return;

  const course = toCourse(values, nextId);

  list.appendChild(renderItem(course));

  count.textContent = list.children.length;
  status.textContent = `${course.code} added successfully.`;

  form.reset();
  submit.disabled = true;
});

// Create a course list item
function renderItem(course) {
  const item = document.createElement("li");
  item.className = "item";

  const span = document.createElement("span");
  span.textContent = `${course.code} · ${course.title} · ${course.credits} cr`;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "Remove";

  item.append(span, remove);

  item.addEventListener("click", () => {
    item.classList.toggle("selected");
  });

  remove.addEventListener("click", (event) => {
    event.stopPropagation();
    item.remove();
    count.textContent = list.children.length;
  });

  return item;
}
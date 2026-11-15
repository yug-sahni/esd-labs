# Audit — React Lab 2
 
Part of what you submit. Fill in sections 0–4 **before** you ask the AI to change anything:
deciding what's wrong is your job, not the AI's. The sheet you audit against is "The Shape
of a Good React Slice" — section 08 of the lab doc.
 
Point at code as `file:line`, e.g. `CoursesPage.jsx:14`.
 
> **What is audited here.** I did not generate the slice with AI. I wrote `src/courses/` by
> hand (see `PROMPTS.md`). So sections 0–5 audit `ai-sample/CoursesPage.jsx`, the
> "typical AI first draft" given with the lab. "After" in section 6 is my hand-written slice.
> All line numbers below are in `ai-sample/CoursesPage.jsx` unless another file is named.
 
---
 
## 0. What came back
 
| File the AI gave you | What's in it (components, hooks) | Lines |
| --- | --- | --- |
| `ai-sample/CoursesPage.jsx` | One component, `CoursesPage`, doing everything: fetch, list, form. 13 × `useState`, 1 × `useEffect`, 2 × `useCallback`, 1 × `useMemo`, 1 × `useRef` | 179 |
 
- Does it run? Yes. The list loads, a valid add appears in code order, a duplicate code
  shows "Course code already exists", and bad input shows fieldErrors under the inputs
  (except Description, which has no field-error slot).
- Requests in the Network tab, on page load: **2 × GET** `/api/courses` in dev (StrictMode,
  `src/main.jsx:7`, runs the effect twice, and there's no cleanup, so both answers are
  used). Per add: **1 × POST + 1 × GET** (it reloads the whole list, `:80`).
- `npm test -- test/courses` before any fix: **4 passed / 0 failed in 1 file;
  4 of 5 test files fail to load.** `CoursesPage.test.jsx` passes.
  `useCourses.test.jsx`, `CoursesView.test.jsx`, `AddCourseForm.test.jsx` and
  `fieldErrors.test.jsx` fail because the sample has no `useCourses`, `CoursesView` or
  `AddCourseForm` to import.
## 1. Part A — walk the allowed list
 
| Element (the sheet, Part A) | Where it is in the AI's code (`file:line`, or "missing") | Right place? If not, where should it be? |
| --- | --- | --- |
| One View component that only renders | Missing. Rendering is inline in `CoursesPage`, `:92–177` | No. Move to `CoursesView.jsx`, taking `{ courses, status, error }` |
| Fetch + logic in a separate hook or module | Missing. `fetchCourses` `:31–43` and `handleSubmit` `:54–90` are inside the page | No. Move to `useCourses.js` (`addCourse` there) |
| `useState` for the course list, at the right level | `:15` | The list is in the page. It should be in `useCourses` |
| `useState` for the form's inputs, at the right level | `:19–24`, six separate calls in the page | No. Move to `AddCourseForm`, which owns its own inputs |
| `useEffect` — for the initial fetch only (with a cleanup) | `:45–47` | Right purpose, but no cleanup/`ignore` flag, and `[fetchCourses]` as deps instead of `[]` |
| Props down, callbacks up (the form raises "add this course") | Missing. No child components, so no props or callbacks | Form should call `onAdd(courseRequest)`; page passes `addCourse` |
| `.map` to render the list, with a stable `key` | `:105–106`, `key={index}` | `.map` is fine; key must be `course.id` |
| Loading / error / empty states, from one `status` | `:97–103`, built from `loading` `:16` + `error` `:17` | No. One `status`: `"loading" \| "ready" \| "error"` |
 
## 2. Part B — scan for "not yet"
 
| Not yet | Found? (`file:line`) | What it does in *this* slice | Cut, or keep — and why |
| --- | --- | --- | --- |
| `useMemo` | `:50–52` | Re-sorts `courses` by code on every change | **Cut.** The server already sends the list sorted; only an insert needs sorting, which `addCourse` does once |
| `useCallback` | `:31` (`fetchCourses`), `:54` (`handleSubmit`) | Keeps function identity stable | **Cut.** Nothing is memoised and nothing receives these as props, so a stable identity buys nothing |
| `useReducer` | Not found | — | — |
| `useRef` | `:28`, used `:81`, `:127` | Focuses the Code input after a successful add | **Cut.** Not in the contract; it isn't taught yet |
| Context (`createContext`, `useContext`) | Not found | — | — |
| A data-fetching library, or `axios`, or raw `fetch` instead of `apiFetch` | Not found; uses `apiFetch` (`:12`, `:34`, `:59`) | — | Fine as is |
| TypeScript (types, interfaces, `.ts`/`.tsx`) | Not found | — | — |
| Anything else nobody taught you (name it) | `import React` `:11` (not needed with the new JSX transform); `parseInt` `:67–68` | `parseInt` quietly turns `"4.5"` into `4`, so the browser changes what was typed | **Cut** the default React import; replace `parseInt` with `Number(…)` so the server sees what was typed and decides |
 
## 3. The rule — every hook and every component split
 
| Hook call or component (`file:line`) | What earns it here? (one sentence) | Keep / cut / move (to where) |
| --- | --- | --- |
| `CoursesPage` (`:14`) | Puts the heading, list and form together | **Keep**, but slim it to only that |
| `useState` courses (`:15`) | The list on screen | **Move** → `useCourses.js` |
| `useState` loading (`:16`) | Loading flag | **Cut**; replaced by one `status` in `useCourses` |
| `useState` error (`:17`) | Load-error message | **Move** → `useCourses.js`, alongside `status` |
| `useState` courseCount (`:18`) | Shows "N courses in the catalogue" | **Cut.** Derived state: it's `courses.length`, and the contract doesn't ask for it (`:95`) |
| `useState` code/title/department/credits/capacity/description (`:19–24`) | Controlled form inputs | **Move** → `AddCourseForm`, as one `values` object |
| `useState` submitting (`:25`) | Disables the button while waiting | **Move** → `AddCourseForm` |
| `useState` formError (`:26`) | Message above the button | **Move** → `AddCourseForm`, as one `error` holding the whole `ApiError` |
| `useState` fieldErrors (`:27`) | Per-field messages | **Cut**: compute it as `error?.fieldErrors ?? {}` instead of storing a second copy |
| `useRef` codeInputRef (`:28`) | Re-focus Code after add | **Cut** (see Part B) |
| `useCallback` fetchCourses (`:31`) | Fetch, also reused to reload after add | **Cut**; the fetch goes inline in the effect |
| `useEffect` (`:45`) | Initial fetch | **Keep, move** → `useCourses.js`, deps `[]`, with an `ignore` cleanup |
| `useMemo` sortedCourses (`:50`) | Sorting | **Cut** (see Part B) |
| `useCallback` handleSubmit (`:54`) | Submit handler | **Split**: the POST and insert go to `useCourses.addCourse`; the submit handler, a plain function, goes to `AddCourseForm` |
| (missing) `CoursesView` | Render loading/error/empty/list from props | **Add** |
| (missing) `AddCourseForm` | Own the inputs, raise `onAdd` | **Add** |
| (missing) `useCourses` | Fetch + `addCourse` | **Add** |
 
## 4. Decisions — before any fix prompt
 
- I will **cut**: `useMemo` `:50`, both `useCallback`s `:31` `:54`, `useRef` `:28`,
  `courseCount` `:18` and its `<p>` `:95`, the `loading` boolean `:16`, the stored
  `fieldErrors` `:27`, the reload after add `:80`, `import React` `:11`, the
  "Adding..." button text `:156` (the contract's button reads "Add course").
- I will **move** (from → to): list state, load error and the effect → `useCourses.js`;
  the POST → `useCourses.addCourse`, which inserts the 201 body sorted by code as a new
  array and lets `ApiError` throw; the render tree `:97–121` → `CoursesView.jsx`; form
  state and `handleSubmit` → `AddCourseForm.jsx`.
- I will **add** (missing from the AI's version): one `status` field; an `ignore` cleanup in
  the effect; `key={course.id}`; `Number(…)` instead of `parseInt`; a field-error slot for
  Description; `aria-invalid="true"` + `aria-describedby` on inputs with a field error, and
  an `id` on each message; `role="alert"` on the message above the button (`:154` has none).
- Other smells I found: derived state stored (`courseCount`, `sortedCourses`, `fieldErrors`);
  a full reload after add instead of inserting the 201 body; `key={index}`; when the reload
  runs, `setLoading(true)` `:32` swaps the list for "Loading courses…" during every add;
  `formError` keeps only `err.message`, so the error object is split across two states.
  No browser validation and no swallowed errors: the catch at `:82–84` shows them.
---
 
## 5. Strip check (section 14 of the doc)
 
Done on a copy of `ai-sample/CoursesPage.jsx` placed at `src/courses/CoursesPage.jsx`,
running `npm test -- courses/CoursesPage` after each step:
 
| Removed | `npm test` after | The app after (loads / adds / shows errors) |
| --- | --- | --- |
| `useMemo` → render `courses` directly | CoursesPage tests: pass | Loads, adds in order (server list is already sorted, and the reload returns it sorted), shows errors |
| `useCallback` on `handleSubmit` → plain function | pass | Same |
| `useCallback` on `fetchCourses` → plain function inside the effect, deps `[]` | pass | Same |
| `useRef` + `.focus()` | pass | Same, minus the focus jump after an add |
 
Removing all four "not yet" items breaks nothing. They were not doing a job in this slice.
 
## 6. Before / after
 
|  | Before (the AI's first version) | After (yours) |
| --- | --- | --- |
| Files and components | 1 file, 1 component (`CoursesPage`) | 4 files: `useCourses` (hook), `CoursesView`, `AddCourseForm`, `CoursesPage` |
| `useState` calls (and where) | 13, all in `CoursesPage` | 6: 3 in `useCourses.js:8–10` (courses, status, error); 3 in `AddCourseForm.jsx:16–18` (values, submitting, error) |
| `useEffect` calls | 1, deps `[fetchCourses]`, no cleanup | 1, `useCourses.js:14`, deps `[]`, `ignore` cleanup |
| "Not yet" items | `useMemo` ×1, `useCallback` ×2, `useRef` ×1 | None |
| Requests: on load / per add | 2 GET used (dev, StrictMode) / 1 POST + 1 GET | 2 GET in dev, the stale one ignored / 1 POST |
| `npm test` | Course tests: 4 passed, 4 of 5 files fail to import | 62 / 62 passed (9 files); `npm run test:stretch` 4 / 4 |
 
## 7. Two sentences
 
- One thing the AI got right that you might not have thought of: It sends
  `description: description || null`, so an empty textarea becomes `null` as the contract
  asks, and it shows each `fieldErrors` entry right under its input instead of in one list.
- One thing you will never accept from an AI without checking again: Code that "works" and
  even passes the page test. This sample passes `CoursesPage.test.jsx` while reloading the
  whole list on every add and using `key={index}`. I'll always check the Network tab and
  every hook's job myself.
 
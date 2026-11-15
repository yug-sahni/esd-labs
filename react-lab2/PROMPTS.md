# Prompt log — React Lab 2
 
Part of what you submit. It shows *how* you used AI: did you hand it the contract and the
rules, or type "make it work"? Fill it in **as you go**, not from memory at the end.
 
- Name and roll number: Yug — <roll number>
- AI tool and plan (e.g. ChatGPT free, Gemini, Claude free, Copilot): Claude (Opus), used only for the prompt below
> **Honest note up front:** I did not use AI to generate the Courses slice. I wrote all four
> files in `src/courses/` (`useCourses.js`, `CoursesView.jsx`, `AddCourseForm.jsx`,
> `CoursesPage.jsx`) by hand, working from `CONTRACT.md` prompt 1 and §4, and the pre-lab
> files in `src/search/` by hand as the pre-lab requires. So no "generate" or "fix" prompts
> were sent, and none are logged here. The audit in `AUDIT.md` is done on
> `ai-sample/CoursesPage.jsx`, the "typical AI first draft" given with the lab, and its
> before/after compares that draft with my hand-written slice.
>
> The only AI prompt in this lab was sent after the code was finished, to help draft
> these two log files. It is logged below in full.
 
---
 
## Prompt 1 — draft the log files (not code)
 
**Why I sent it:** The code was done and `npm test` was green. I wanted help writing up
`PROMPTS.md` and `AUDIT.md` from the work in the folder.
 
**Sent:** (with the zipped `react-lab2` folder attached)
 
```text
this is the work i have done myself, it says write ai logs in prompt.md and audit.md
so write those for me
```
 
**What came back:** The AI said it would not invent prompts that were never sent. It ran
`npm test` (62/62 passed) and `npm run test:stretch` (4/4 passed) on my folder. It also put
`ai-sample/CoursesPage.jsx` alone into `src/courses/` and ran `npm test -- test/courses`:
only `CoursesPage.test.jsx` passed (4 tests), and the other 4 course test files failed
because the files they import don't exist. It then drafted this file, saying plainly that
no AI wrote the code, and drafted `AUDIT.md` as an audit of the AI sample with `file:line`
references.
 
**What I kept, and what I rejected:** I checked the drafts against the code and the test
output. I kept the structure and the line references, and filled in my roll number.
 
---
 
## Afterwards
 
- How many prompts did the whole feature take? Zero for the feature itself: I wrote it by
  hand. One prompt in total, for drafting these logs.
- Which of your prompts would you write differently now, and how? I would log the work as
  I went instead of asking for the logs at the end. If I did the lab-day part again as
  intended, I would paste `CONTRACT.md` prompt 1 unchanged into a new chat, audit what came
  back in `AUDIT.md` before any fix prompt, and then send one fix prompt made of my audit
  decisions plus §4.
- One thing the rules in prompt 1 prevented (or failed to prevent): I didn't run prompt 1,
  so I can't report what it prevented in practice. Compared with `ai-sample/CoursesPage.jsx`
  (written with no rules), the line "Use only useState and useEffect. Do not use useMemo,
  useCallback, useReducer, useRef…" targets exactly the `useCallback`/`useMemo`/`useRef` in
  that sample, and "Do NOT reload the whole list" targets its `await fetchCourses()` after
  each add (`ai-sample/CoursesPage.jsx:80`). Nothing in prompt 1 asks for the `aria-invalid`
  / `aria-describedby` / `role="alert"` wiring that §4 and `fieldErrors.test.jsx` check, so
  a first draft would probably miss it.
 
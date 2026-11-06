// Section 05 — State as a state machine

export const initialState = Object.freeze({
  status: "idle",
  courses: [],
  error: null,
  departments: [],
  department: "",
  query: "",
  planner: [],
  grades: {},
});

export function transition(state, event) {
  switch (event.type) {
    case "LOAD_START":
      return {
        ...state,
        status: "loading",
        error: null,
      };

    case "LOAD_OK": {
      const departments =
        state.departments.length > 0
          ? state.departments
          : [...new Set(event.courses.map((course) => course.department))]
              .sort();

      return {
        ...state,
        status: "ready",
        courses: event.courses,
        error: null,
        departments,
      };
    }

    case "LOAD_FAIL":
      return {
        ...state,
        status: "error",
        error: event.message,
      };

    case "SET_DEPARTMENT":
      if (state.department === event.department) return state;

      return {
        ...state,
        department: event.department,
      };

    case "SET_QUERY":
      if (state.query === event.query) return state;

      return {
        ...state,
        query: event.query,
      };

    case "ADD": {
      const course = event.course;

      if (state.planner.some((item) => item.id === course.id)) {
        return state;
      }

      if (course.seatsLeft === 0) {
        return state;
      }

      const total = state.planner.reduce((sum, item) => sum + item.credits, 0);
      if (total + course.credits > 24) {
        return state;
      }

      const plannerCourse = {
        id: course.id,
        code: course.code,
        title: course.title,
        credits: course.credits,
      };

      return {
        ...state,
        planner: [...state.planner, plannerCourse],
      };
    }

    case "REMOVE": {
      if (!state.planner.some((course) => course.id === event.id)) {
        return state;
      }

      const planner = state.planner.filter(
        (course) => course.id !== event.id
      );

      const grades = { ...state.grades };
      delete grades[event.id];

      return {
        ...state,
        planner,
        grades,
      };
    }

    case "SET_GRADE": {
      const currentGrade = state.grades[event.id];

      if (event.grade === "") {
        if (!(event.id in state.grades)) return state;

        const grades = { ...state.grades };
        delete grades[event.id];

        return {
          ...state,
          grades,
        };
      }

      if (currentGrade === event.grade) return state;

      return {
        ...state,
        grades: {
          ...state.grades,
          [event.id]: event.grade,
        },
      };
    }

    default:
      return state;
  }
}
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../actions-types";
import { compareCourses, Course } from "../model/course";

// estende il model Course
export interface CoursesState extends EntityState<Course> {
  // Contiene un dictionary di entities memorizzati da
  // ciascun id
  entities: {[key: number]: Course};
  // array che definisce il naturale ordine delle entità
  ids: number[]
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  //selectId: course => course.courseId
});

// questo oggetto ha dele funzioni che fanno in modo di implementare
// in nostro reduer in modo semplice

// initialState
export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,

  on(CourseActions.allCoursesLoaded,
    // addAll(action.payload, state)
    (state, action) => adapter.addAll(action.courses, state))
);

// selectAll: select all enitites (course)
export const {selectAll} = adapter.getSelectors();

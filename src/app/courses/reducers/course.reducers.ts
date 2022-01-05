import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../actions-types";
import { compareCourses, Course } from "../model/course";

// estende il model Course
export interface CoursesState extends EntityState<Course> {
  // Contiene un dictionary di entities memorizzati da
  // ciascun id
  //entities: {[key: number]: Course};
  // array che definisce il naturale ordine delle entità
  //ids: number[]
  // booleano che definisce il caricamento dei corsi
  allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  //selectId: course => course.courseId
});

// questo oggetto ha dele funzioni che fanno in modo di implementare
// in nostro reduer in modo semplice

// initialState
export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCoursesState,

  on(CourseActions.allCoursesLoaded,
    // addAll(action.payload, state)
    // addAll inserisce un range di valori
    // allo store
    (state, action) => adapter.addAll(
      action.courses,
      {
        ...state,
        // una volta che i corsi sono caricati settiamo la
        // variabile a true
        allCoursesLoaded: true
      })),

  // updateOne modifica uno specifico
  // elemento allo store
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state))
);

// selectAll: select all enitites (course)
export const {selectAll} = adapter.getSelectors();

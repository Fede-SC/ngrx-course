import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CourseActions } from "./actions-types";
import { allCoursesLoaded } from "./course.actions";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(
    () => this.actions$
      .pipe( // viene fatto il dispatch di loadAllCourses
        ofType(CourseActions.loadAllCourses),
        concatMap(action => this.coursesHttpService.findAllCourses()),
        //viene fatto il dispatch dei corsi caricati passando
        // i corsi restituiti dal server come payload
        map(courses => allCoursesLoaded({courses}))
      )
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService) {}
}

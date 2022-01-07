import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private coursesService: CourseEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    this.coursesService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.coursesService.getAll();
          }
        }),
        filter(loader => !!loader),
        first()
      );

    // getAll è un metodo di EntityCollectionServiceBase
    // che restituisce tutti i corsi
    // return this.coursesService.getAll()
    //   .pipe(
    //     map(courses => !!courses)
    //   );
  }
}

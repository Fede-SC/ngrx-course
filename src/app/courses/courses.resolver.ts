import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { loadAllCourses } from "./course.actions";

// Il router resolver è un particolare servizio che viene
// eseguito prima che il router completa una sua navigazione
// ad un determinato path a cui viene applicato
// In questo caso prima che venga caricata la pagina vengono
// caricati prima tutti i corsi
@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}

  // Questio metodo viene lanciato prima di completare la transition
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        tap(() => {
          if (!this.loading) {
            this.loading = true;
            this.store.dispatch(loadAllCourses());
          }
        }),
        first(),
        finalize(() => this.loading = false)
      );
  }
}

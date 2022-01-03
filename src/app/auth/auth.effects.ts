import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";

// In questo caso vogliamo che come side effect venga salvato
// il profilo dell'utente nel local storage
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.login),
        tap(action => {
          localStorage.setItem('user', JSON.stringify(action.user));
        })
      // specifichiamo che questo particolare side effect non
      // è un risultato di un dispatch
    ), {dispatch: false});

  logout$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.logout),
        tap(action => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      ));
  constructor(
    private actions$: Actions,
    private router: Router) {
    // actions$.subscribe(action => {
    //   // se si tratta dell'azione di login
    //   if (action.type === '[Login Page] User Login') {
    //     localStorage.setItem('user', JSON.stringify(action['user']));
    //   }
    // });
    // Le istruzioni sopra equivalgono a quelle seguenti
    // const login$ = this.actions$
    //   .pipe(
    //     ofType(AuthActions.login),
    //     tap(action => {
    //       localStorage.setItem('user', JSON.stringify(action.user));
    //     })
    //   );
    // login$.subscribe();
  }
}

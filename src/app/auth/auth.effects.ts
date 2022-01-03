import { Injectable } from "@angular/core";
import { act, Actions } from "@ngrx/effects";

// In questo caso vogliamo che come side effect venga salvato
// il profilo dell'utente nel local storage
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {
    actions$.subscribe(action => {
      // se si tratta dell'azione di login
      if (action.type === '[Login Page] User Login') {
        localStorage.setItem('user', JSON.stringify(action['action']));
      }
    });
  }
}

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

// Questa featre selector prende come unico elemento il nome
// della property in cui noi vogliamo accedere nello stato globale
// auth è il nome del reducer che stiamo utilizzando
export const selectAuthState =
  createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
  //state => state['auth'],
  // in sostituzione possiamo usare la feature selector
  selectAuthState,
  auth => !!auth.user
);

export const isLoggedOut = createSelector(
  // abbiamo la possibilità di combinare più selettori per restituire
  // un determinato valore
  isLoggedIn,
  loggedIn => !loggedIn
);

import { createSelector } from "@ngrx/store";

export const isLoggedIn = createSelector(
  state => state['auth'],
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  // abbiamo la possibilità di combinare più selettori per restituire
  // un determinato valore
  isLoggedIn,
  loggedIn => !loggedIn
);

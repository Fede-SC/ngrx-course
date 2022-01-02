import {createAction, props} from '@ngrx/store';
import {User} from './model/user.model';

export const login = createAction(
    // tra le parentesi quadre definiamo l'origine della action
    // all'interno dell'applicazione, seguiamo il nome dell'evento
    "[Login Page] User Login",
    props<{user: User}>() // il parametro che accetta la action
);

export const logout = createAction(
  "[Top Menu] Logout"
);

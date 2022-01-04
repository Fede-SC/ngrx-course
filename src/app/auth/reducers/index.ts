import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import {User} from '../model/user.model';
import {AuthActions} from '../action-types';

export interface AuthState {
  user: User
}

export const initialAuthState: AuthState = {
  user: undefined
};

// nel reducer definiamo il nostro stato e la logica delle nostre
// action
export const authReducer = createReducer(

  initialAuthState,

  on(AuthActions.login, (state, action) => {
    state.user = action.user;
    return state;
    // return {
    //   user: action.user
    // }
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    }
  })
);

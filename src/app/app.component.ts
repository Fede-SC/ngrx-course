import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router,
      private store: Store<AppState>) {

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });
      this.isLoggedIn$ = this.store
        .pipe(
          // accediamo all'auth property dello state
          // e controlliamo se il profilo utente sia disponibile o no
          // convertendo questo valore in un booleano
          // I selector mappano le funzioni in memoria
          // L'operatore select di ngrx fa il mapping del valore
          // (come map) + effettua l'eliminazione dei duplicati
          // della stessa operazione in modo da migliorare le
          // performance e pulire al pisogno la memory cache
          //select(state => !!state['auth'].user)
          // in sostituzione possiamo creare un selettore apposito
          select(isLoggedIn)
        );
      this.isLoggedOut$ = this.store
        .pipe(
          //select(state => !state['auth'].user)
          select(isLoggedOut)
        );
    }

    logout() {
      this.store.dispatch(logout());
    }

}

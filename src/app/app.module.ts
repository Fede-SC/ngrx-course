import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';

import {EffectsModule} from '@ngrx/effects';
import {EntityDataModule} from '@ngrx/data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { reducers, metaReducers } from './reducers';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    // ng add @ngrx/store
    // Implementiamo l'ngrx module nella root dell'applicazione.
    // e implementiamo i servizi che implementa questo modulo
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        // con questa impostazione siamo sicuri che lo stato
        // nello store non sia mai mutato accidentalemente
        strictStateImmutability: true,
        // con questa impostazione siamo sicuri che l'oggetto
        // action non venga mai mutato accidentalemente
        strictActionImmutability: true,
        // rende l'oggetto action e lo state serializzabile
        strictActionSerializability: true,
        strictStateSerializability: true
      }
    }),
    // ng add @ngrx/store-devtools
    // maxAge significa che vogliamo tenere in memoria le ultime
    // 25 versioni dei nostri dati
    // con logOnly speciichiamo che vogliamo i dev tools spenti in
    // production
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    // Gli effects utilizzano flussi per fornire
    // nuove fonti di azioni per ridurre
    // lo stato in basea interazioni esterne
    EffectsModule.forRoot([]),
    // nel nostro course entity andiamo ad associargli il
    // lazy lodaded module relativo ai corsi
    // EntityDataModule.forRoot([]),
    // Connette il routermodule con lo store module
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as fromActions from '../actions/usuario.actions';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioState } from '../states/app.states';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService,
    private store: Store<UsuarioState>
  ) {}

  loadAllArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LoadUsuarios),
      switchMap(() =>
        this.usuarioService
          .getAllUsuarios()
          .pipe(
            map((data) =>
              fromActions.LoadUsuariosSuccess({ payload: { usuarios: data } })
            )
          )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.Login),
      switchMap((action) =>
        this.usuarioService.logIn(action.username, action.password).pipe(
          map((data) =>{
            return fromActions.LoginSuccess()
          }
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LoginSuccess),
      take(1),
      tap(() =>window.location.reload())
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.Logout),
      switchMap(() =>
        this.usuarioService.logOut().pipe(
          tap(() => window.location.reload()),
          map(() => fromActions.LogoutSuccess())
        )
      )
    )
  );
}

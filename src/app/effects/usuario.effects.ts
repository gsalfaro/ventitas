import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromActions from '../actions/usuario.actions';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
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
          tap(() => window.location.reload()),
          map((result) => {
            if (result) {
              return fromActions.LoginSuccess();
            } else {
              return fromActions.LoginError();
            }
          })
        )
      )
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

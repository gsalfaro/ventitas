import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromActions from '../actions/articulo.actions';
import { Articulo } from '../models/articulo';
import { ArticuloService } from '../services/articulo.service';

@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private articleService: ArticuloService
  ) {}

  loadAllArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LoadArticulos),
      switchMap(() =>
        this.articleService
          .getAllArticles()
          .pipe(
            map((data) =>
              fromActions.LoadArticulosSuccess({ payload: { articulos: data } })
            )
          )
      )
    )
  );

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.AddArticulo),
      tap((action) => {console.log(action.articulo);}),
      switchMap((action) =>
        this.articleService.create(action.articulo).then((data) => {
          if(data){
           return fromActions.AddArticuloSuccess({ articulo: data });
          }else{
            return fromActions.AddArticuloError();
          }
        }),
      )
    )
  );

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.UpdateArticulo),
      switchMap((action) =>
        this.articleService.update(action.articulo.id, {Vendido : action.articulo.Vendido}).then(() => {
            return fromActions.UpdateArticuloSuccess({ id: action.articulo.id, changes: {Vendido : action.articulo.Vendido} });
          }
        )
      )
    )
  );


}

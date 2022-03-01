import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Articulo } from '../models/articulo';

enum ArticuloActionTypes {
  ADD_ARTICLE = '[ARTICLE] Add Articulo',
  ADD_ARTICLE_SUCCESS = '[ARTICLE] Add Articulo Success',
  ADD_ARTICLE_ERROR = '[ARTICLE] Add Articulo Error',
  UPDATE_ARTICLE = '[ARTICLE] Update Articulo',
  REMOVE_ARTICLE = '[ARTICLE] Remove Articulo',
  LOAD_ALL_ARTICLES = '[ARTICLE] Load All Articulos',
  LOAD_ALL_ARTICLES_SUCCESS = '[ARTICLE] Load All Articulos Success',
  SELECT_CATEGORIA = '[CATEGORIA] Select Categoria',
}

export const SelectCategoria = createAction(
  ArticuloActionTypes.SELECT_CATEGORIA,
  props<{ categoria: string}>()
);

export const AddArticulo = createAction(
  ArticuloActionTypes.ADD_ARTICLE,
  props<{ articulo: Articulo}>()
);
export const AddArticuloSuccess = createAction(
  ArticuloActionTypes.ADD_ARTICLE_SUCCESS,
  props<{ articulo: Articulo}>()
);
export const AddArticuloError = createAction(
  ArticuloActionTypes.ADD_ARTICLE_ERROR,
);

export const UpdateArticulo = createAction(
  ArticuloActionTypes.UPDATE_ARTICLE,
  props<{ payload: { articulo: Update<Articulo> } }>()
);
export const RemoveArticulo = createAction(
  ArticuloActionTypes.REMOVE_ARTICLE,
  props<{ payload: { id: string } }>()
);
export const LoadArticulos = createAction(ArticuloActionTypes.LOAD_ALL_ARTICLES);
export const LoadArticulosSuccess = createAction(
  ArticuloActionTypes.LOAD_ALL_ARTICLES_SUCCESS,
  props<{ payload: { articulos: Articulo[] } }>()
);

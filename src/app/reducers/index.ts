import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.states';
import * as articuloReducer from './articulo.reducer';
import * as usuarioReducer from './usuario.reducer';

export const reducers: ActionReducerMap<AppState> = {
  articuloState: articuloReducer.articleReducer,
  usuarioState: usuarioReducer.usuarioReducer,
};

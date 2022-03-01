import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  Action,
} from '@ngrx/store';
import * as fromActions from '../actions/usuario.actions';
import { UsuarioState } from '../states/app.states';
import * as fromAdapter from './usuario.adapter';

export const initialState: UsuarioState = fromAdapter.adapter.getInitialState({
  selectedUsuarioId: '',
});
// Creating reducer
const _usuarioReducer = createReducer(
  initialState,
  on(fromActions.LoadUsuariosSuccess, (state, { payload }) => {
    state = fromAdapter.adapter.removeAll({ ...state, selectedUsuarioId: '' });
    return fromAdapter.adapter.addMany(payload.usuarios, state);
  })
);

export function usuarioReducer(state: any, action: Action) {
  return _usuarioReducer(state, action);
}

// Creating selectors
export const getSelectedUsuarioId = (state: UsuarioState) =>
  state.selectedUsuarioId;

export const getUsuarioState =
  createFeatureSelector<UsuarioState>('usuarioState');

export const selectUsuarioIds = createSelector(
  getUsuarioState,
  fromAdapter.selectUsuarioIds
);
export const selectUsuarioEntities = createSelector(
  getUsuarioState,
  fromAdapter.selectUsuarioEntities
);
export const selectAllUsuarios = createSelector(
  getUsuarioState,
  fromAdapter.selectAllUsuarios
);
export const articlesCount = createSelector(
  getUsuarioState,
  fromAdapter.usuariosCount
);

export const selectCurrentUsuarioId = createSelector(
  getUsuarioState,
  getSelectedUsuarioId
);

export const selectCurrentUsuario = createSelector(
  selectUsuarioEntities,
  selectCurrentUsuarioId,
  (usuarioEntities, usuarioId) => usuarioEntities[usuarioId]
);

export const selectLoguedUser = createSelector(
  selectAllUsuarios,
  (usuarios) => {
    const loguedUser = JSON.parse(localStorage.getItem('loguedUser') || 'null');

    if(loguedUser == null) {
      return null;
    }

    let loguedUsuario = usuarios.filter((usuario) => {
      return usuario.nombre === loguedUser.nombre;
    });

    if(loguedUsuario.length == 0){
      return null;
    }

    return loguedUsuario[0];
  });

import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Usuario } from '../models/usuario';

export const adapter: EntityAdapter<Usuario> = createEntityAdapter<Usuario>();

export const {
  selectIds: selectUsuarioIds,
  selectEntities: selectUsuarioEntities,
  selectAll: selectAllUsuarios,
  selectTotal: usuariosCount,
} = adapter.getSelectors(); 
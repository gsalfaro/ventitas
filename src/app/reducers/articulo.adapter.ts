import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Articulo } from '../models/articulo';

export const adapter: EntityAdapter<Articulo> = createEntityAdapter<Articulo>();

export const {
  selectIds: selectArticuloIds,
  selectEntities: selectArticuloEntities,
  selectAll: selectAllArticulos,
  selectTotal: articulosCount,
} = adapter.getSelectors(); 
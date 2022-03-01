import { EntityState } from "@ngrx/entity";
import { Articulo } from "src/app/models/articulo";
import { Usuario } from "../models/usuario";

export interface AppState {
  articuloState: ArticuloState;
  usuarioState: UsuarioState;
}

export interface ArticuloState extends EntityState<Articulo> {
  selectedArticuloId: string;
  selectedCategory: string;
}

export interface UsuarioState extends EntityState<Usuario> {
  selectedUsuarioId: string;
}

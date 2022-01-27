import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario';

enum UsuarioActionTypes {
  LOAD_ALL_USUARIOS = '[USUARIO] Load All Usuarios',
  LOAD_ALL_USUARIOS_SUCCESS = '[USUARIO] Load All Usuarios Success',
  LOGIN_USER = '[USUARIO] Login User',
  LOGOUT_USER = '[USUARIO] Logout User',
  LOGIN_USER_SUCCESS = '[USUARIO] Login User Success',
  LOGOUT_USER_SUCCESS = '[USUARIO] Logout User Success',
  LOGIN_USER_ERROR = '[USUARIO] Login User Error'
}

export const LoadUsuarios = createAction(UsuarioActionTypes.LOAD_ALL_USUARIOS);
export const LoadUsuariosSuccess = createAction(
  UsuarioActionTypes.LOAD_ALL_USUARIOS_SUCCESS,
  props<{ payload: { usuarios: Usuario[] } }>()
);

export const Login = createAction(
  UsuarioActionTypes.LOGIN_USER,
  props<{ username: string, password: string }>()
);

export const Logout = createAction(UsuarioActionTypes.LOGOUT_USER);

export const LoginSuccess = createAction(UsuarioActionTypes.LOGIN_USER_SUCCESS);
export const LoginError = createAction(UsuarioActionTypes.LOGIN_USER_ERROR);
export const LogoutSuccess = createAction(UsuarioActionTypes.LOGOUT_USER_SUCCESS);

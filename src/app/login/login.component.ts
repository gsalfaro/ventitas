import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, tap } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import * as fromUsuarioReducer from '../reducers/usuario.reducer';
import * as fromArticuloReducer from '../reducers/articulo.reducer';
import * as fromActions from '../actions/usuario.actions';
import * as fromArticuloActions from '../actions/articulo.actions';
import { Store } from '@ngrx/store';
import { UsuarioState } from '../states/app.states';
import { UsuarioService } from '../services/usuario.service';
import { Articulo } from '../models/articulo';
import { ArticuloService } from '../services/articulo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuarios$: Observable<Usuario[]>;
  isLoggued$: boolean = false;
  loguedUser$: Observable<Usuario | null>;
  loguedUser: Usuario | null = null;
  totalArticulos$: Observable<number>;
  totalArticulos?: number;

  constructor(
    private store: Store<UsuarioState>,
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private articuloService: ArticuloService
  ) {

    this.totalArticulos$ = this.store.select(fromArticuloReducer.articlesCount);
    this.totalArticulos$.subscribe(x => this.totalArticulos = x);

    this.usuarios$ = store.select(fromUsuarioReducer.selectAllUsuarios);

    usuarioService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggued$ = loggedIn;
    });

    this.loguedUser$ = store.select(fromUsuarioReducer.selectLoguedUser);
    this.loguedUser$.subscribe(user => {
      if(user != null) {
        this.loguedUser = user;
      }
    });
  }

  @ViewChild('myModalLogin', { static: false }) myModalLogin:
    | TemplateRef<any>
    | undefined;

  @ViewChild('myModalNuevoArticulo', { static: false }) myModalNuevoArticulo:
    | TemplateRef<any>
    | undefined;

  ngOnInit() {
    this.store.dispatch(fromActions.LoadUsuarios());
  }

  public abrirModalLogin() {
    this.modalService.open(this.myModalLogin);
  }

  public abrirModalArticulo() {
    this.modalService.open(this.myModalNuevoArticulo);
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  nuevoArticuloForm = new FormGroup({
    descripcion: new FormControl(''),
    categoria: new FormControl(''),
    precio: new FormControl(''),
    imagen1: new FormControl(''),
    imagen2: new FormControl(''),
  });

  onLoginSubmit() {
    if (this.loginForm) {
      let username = this.loginForm.get('username');
      let password = this.loginForm.get('password');

      if (username && password) {

        this.store.dispatch(
          fromActions.Login({
            username: username.value,
            password: password.value,
          })
        );
      }
    }

    this.modalService.dismissAll();

    this.loginForm.reset();
  }

  onNuevoArticuloSubmit() {

    let descripcion = this.nuevoArticuloForm.get('descripcion');
    let categoria = this.nuevoArticuloForm.get('categoria');
    let precio = this.nuevoArticuloForm.get('precio');
    let imagen1 = this.nuevoArticuloForm.get('imagen1');
    let imagen2 = this.nuevoArticuloForm.get('imagen2');

    if (descripcion && precio && imagen1 && categoria && this.loguedUser) {
      let nuevoArticulo = {
        Codigo: this.totalArticulos ?? 0 + 1 + "",
        Categoria: categoria.value,
        Descripcion: descripcion.value,
        Precio: precio.value,
        Imagenes: [imagen1.value],
        Usuario: this.loguedUser.id,
        Telefono : this.loguedUser.telefono,
      } as Articulo;

      if (imagen2?.value) {
        nuevoArticulo.Imagenes.push(imagen2.value);
      }

      this.store.dispatch(
        fromArticuloActions.AddArticulo({ articulo: nuevoArticulo })
      );

      this.modalService.dismissAll();

      this.nuevoArticuloForm.reset();
    }
  }

  logout() {
    this.store.dispatch(fromActions.Logout());
  }
}

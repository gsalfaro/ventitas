import { Component } from '@angular/core';
import * as fromReducer from './reducers/articulo.reducer';
import * as fromUsuarioReducer from './reducers/usuario.reducer';
import * as fromActions from './actions/articulo.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/models/articulo';
import { ArticuloState } from './states/app.states';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app-ventitas';
  articulos$: Observable<Articulo[]>;
  isLoggued$: boolean = false;
  loguedUser$: Observable<Usuario | null>;
  loguedUser: Usuario | null = null;

  constructor(
    private store: Store<ArticuloState>,
    usuarioService: UsuarioService
  ) {
    this.articulos$ = store.select(fromReducer.selectAllArticles);
    usuarioService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggued$ = loggedIn;
    });

    this.loguedUser$ = store.select(fromUsuarioReducer.selectLoguedUser);
    this.loguedUser$.subscribe((user) => {
      if (user != null) {
        this.loguedUser = user;        
      }
    });

  }

  public modalApartar(id?: string) {
    alert(id);
  }

  ngOnInit() {
    this.store.dispatch(fromActions.LoadArticulos());
  }
}

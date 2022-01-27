import { Component } from '@angular/core';
import * as fromReducer from './reducers/articulo.reducer';
import * as fromActions from './actions/articulo.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/models/articulo';
import { ArticuloState } from './states/app.states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app-ventitas';
  articulos$: Observable<Articulo[]>;

  constructor(private store: Store<ArticuloState>) {
    this.articulos$ = store.select(fromReducer.selectAllArticles);
  }

  public modalApartar(id?: string) {
    alert(id);
  }

  ngOnInit() {
    this.store.dispatch(fromActions.LoadArticulos());
  }
}

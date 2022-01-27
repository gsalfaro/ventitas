import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  Action,
} from '@ngrx/store';
import * as fromActions from '../actions/articulo.actions';
import { ArticuloState } from '../states/app.states';
import * as fromAdapter from './articulo.adapter';

export const initialState: ArticuloState = fromAdapter.adapter.getInitialState({
  selectedArticuloId: '',
});
// Creating reducer
const _articleReducer = createReducer(
  initialState,
  on(fromActions.AddArticuloSuccess, (state, articulo) =>
    fromAdapter.adapter.addOne(articulo.articulo, state)
  ),
  on(fromActions.UpdateArticulo, (state, { payload }) =>
    fromAdapter.adapter.updateOne(payload.articulo, state)
  ),
  on(fromActions.RemoveArticulo, (state, { payload }) =>
    fromAdapter.adapter.removeOne(payload.id, state)
  ),
  on(fromActions.LoadArticulosSuccess, (state, { payload }) => {
    state = fromAdapter.adapter.removeAll({ ...state, selectedArticleId: '' });
    return fromAdapter.adapter.addMany(payload.articulos, state);
  })
);

export function articleReducer(state: any, action: Action) {
  return _articleReducer(state, action);
}

// Creating selectors
export const getSelectedArticleId = (state: ArticuloState) =>
  state.selectedArticuloId;

export const getArticleState =
  createFeatureSelector<ArticuloState>('articuloState');

export const selectArticleIds = createSelector(
  getArticleState,
  fromAdapter.selectArticuloIds
);
export const selectArticleEntities = createSelector(
  getArticleState,
  fromAdapter.selectArticuloEntities
);
export const selectAllArticles = createSelector(
  getArticleState,
  fromAdapter.selectAllArticulos
);
export const articlesCount = createSelector(
  getArticleState,
  fromAdapter.articulosCount
);

export const selectCurrentArticleId = createSelector(
  getArticleState,
  getSelectedArticleId
);

export const selectCurrentArticle = createSelector(
  selectArticleEntities,
  selectCurrentArticleId,
  (articleEntities, articleId) => articleEntities[articleId]
);

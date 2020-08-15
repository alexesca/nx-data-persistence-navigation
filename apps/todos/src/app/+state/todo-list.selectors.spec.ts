import { TodosListEntity } from './todos-list.models';
import { State, todosListAdapter, initialState } from './todos-list.reducer';
import * as TodosListSelectors from './todos-list.selectors';

describe('TodosList Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTodosListId = (it) => it['id'];
  const createTodosListEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TodosListEntity);

  let state;

  beforeEach(() => {
    state = {
      todosList: todosListAdapter.addAll(
        [
          createTodosListEntity('PRODUCT-AAA'),
          createTodosListEntity('PRODUCT-BBB'),
          createTodosListEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('TodosList Selectors', () => {
    it('getAllTodosList() should return the list of TodosList', () => {
      const results = TodosListSelectors.getAllTodosList(state);
      const selId = getTodosListId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TodosListSelectors.getSelected(state);
      const selId = getTodosListId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getTodosListLoaded() should return the current 'loaded' status", () => {
      const result = TodosListSelectors.getTodosListLoaded(state);

      expect(result).toBe(true);
    });

    it("getTodosListError() should return the current 'error' state", () => {
      const result = TodosListSelectors.getTodosListError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});

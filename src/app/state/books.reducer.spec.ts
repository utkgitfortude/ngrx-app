import * as fromReducer from './books.reducer';
import { retrievedBookList } from './books.action';
import { Book } from '../book-list/book.model';

describe('BooksReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.booksReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('retrievedBookList action', () => {
    it('should retrieve all books and update the state in an immutable way', () => {
      const { initialState } = fromReducer;
      const newState: Array<Book> = [
        {
          id: 'firstId',
          volumeInfo: {
            title: 'First Title',
            authors: ['First Author'],
          },
        },
      ];
      const action = retrievedBookList({ data: newState });
      const state = fromReducer.booksReducer(initialState, action.data);
      expect(action.data).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });
});
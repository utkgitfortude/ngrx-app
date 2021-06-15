import { createReducer, on, Action } from '@ngrx/store';

import { retrievedBookList } from './books.action';
import { Book } from '../book-list/book.model';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(retrievedBookList, (state:any, action:any) => {
    return{
      ...state, 
      books : action.books
    }
  })
);


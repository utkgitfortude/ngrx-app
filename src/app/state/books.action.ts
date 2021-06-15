import { createAction, props } from '@ngrx/store';
 
export const addBook : any = createAction(
  '[Book List] Add Book',
  props<{ bookId: any }>()
);
 
export const removeBook : any = createAction(
  '[Book Collection] Remove Book',
  props<{ bookId: any }>()
);

export const loadBooks = createAction(
  '[Book] Load'
);
 
export const retrievedBookList : any = createAction(
  '[Book List/API] Retrieve Books Success',
  props<{ Book: any }>()
);
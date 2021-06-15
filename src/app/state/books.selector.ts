
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { Book } from "../book-list/book.model";
 
export const selectBooks : any = createSelector(
  (state: AppState) : any => state.books,
  (books: Array<Book>) : any => books
);
 
export const selectCollectionState : any = createFeatureSelector<
  AppState,
  ReadonlyArray<string>
>("collection");
 
export const selectBookCollection : any = createSelector(
  selectBooks,
  selectCollectionState,
  (books: Array<Book>, collection: Array<string>) => {
    return collection.map((id) => books.find((book:any) => book.id === id));
  }
);

export const getBooks = createSelector(
  (state: AppState) : any => state.books,
  (books: Array<Book>) : any => books
);
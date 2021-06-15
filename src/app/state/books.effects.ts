import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { GoogleBooksService } from '../book-list/books.service';
import * as BooksAction from './books.action';

@Injectable()

export class BookEffects {
    constructor(private action$: Actions,
        private googleBookService: GoogleBooksService
    ) { }
    loadBooks$ = createEffect(() => {
        return this.action$.pipe(
            ofType(BooksAction.loadBooks),
            mergeMap(() => this.googleBookService.getBooks().pipe(
            map(books => {return BooksAction.retrievedBookList({ books })})))
        )
    })
}
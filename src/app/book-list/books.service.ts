import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Book } from './book.model';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Array<Book>>{
    return this.http.get<{items : any}>('https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks')
      .pipe(map((books:any) => books.items || []));
  }

}
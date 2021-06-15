import { TestBed, } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { of, ReplaySubject } from 'rxjs';
import { BookEffects } from './books.effects';
import { retrievedBookList, loadBooks } from './books.action';
import { GoogleBooksService } from '../book-list/books.service';
const bookArray : any = [
  {
    id: 'firstId',
    volumeInfo: {
      title: 'First Title',
      authors: ['First Author'],
    },
  },
];


describe('BookEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: BookEffects;
  let BookServiceSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookEffects, {
        provide: GoogleBooksService,
        useValue: jasmine.createSpyObj('BookService', [
          'getBooks', 'pipe', 'loadBooks$'
        ]),
      },
        provideMockActions(() => actions$)]
    });

    effects = TestBed.inject<BookEffects>(BookEffects);
    BookServiceSpy = TestBed.inject(GoogleBooksService);
  });

  it('should retrieve BookList', (done: DoneFn) => {
    actions$ = new ReplaySubject();
    BookServiceSpy.getBooks.and.returnValue(
      of(bookArray)
    );

    const expectedResult = retrievedBookList({
      data: bookArray
    });

    (actions$ as ReplaySubject<any>).next(loadBooks);

    effects.loadBooks$.subscribe((data: any) => {
      let returnedData : any = data?.books;
      expect(returnedData).toEqual(bookArray);
      expect(returnedData).not.toBe(expectedResult);
      done();
    });
  })
});


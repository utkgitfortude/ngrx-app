import {​​​​​​​​ TestBed }​​​​​​​​ from'@angular/core/testing';
import {​​​​​​​​ provideMockActions }​​​​​​​​ from'@ngrx/effects/testing';
import {​​​​​​​​ Observable }​​​​​​​​ from'rxjs';
import {​​​​​​​​ of, ReplaySubject }​​​​​​​​ from'rxjs';
import {​​​​​​​​ BookEffects }​​​​​​​​ from'./books.effects';
import {​​​​​​​​ retrievedBookList, loadBooks }​​​​​​​​ from'./books.action';
import  {​​​​​​​​ GoogleBooksService }​​​​​​​​ from'../book-list/books.service';
describe('BookEffects', () => {​​​​​​​​
let actions$: ReplaySubject<any>;
let effects: BookEffects;
let BookServiceSpy: any = GoogleBooksService;
 
beforeEach(() => {​​​​​​​​
    TestBed.configureTestingModule({​​​​​​​​providers: [ BookEffects, {​​​​​​​​
        provide: GoogleBooksService,
            useValue:jasmine.createSpyObj('BookService', [
                'getBooks',
            ]),
        }​​​​​​​​,
    provideMockActions(() =>actions$)]}​​​​​​);
 
    effects = TestBed.inject<BookEffects>(BookEffects);}​​​​​​​​);
    
    it('should retrieve BookList', () => {​​​​​​​​ 
    actions$ = new ReplaySubject();
    BookServiceSpy.getBooks.and.returnValue(
    of( [
        {
          id: 'firstId',
          volumeInfo: {
            title: 'First Title',
            authors: ['First Author'],
          },
        },
      ]​)
    );
    const expectedResult = new retrievedBookList({​​​​​​​​data: [
        {
          id: 'firstId',
          volumeInfo: {
            title: 'First Title',
            authors: ['First Author'],
          },
        },
      ]}​​​​​​​​);
    (actions$ as ReplaySubject<any>).next(loadBooks);
    
    effects.loadBooks$.subscribe((action) => {​​​​​​​​
        expect(action).toEqual(expectedResult);
        }​​​​​​​​);
    }​​​​​​​​);
}​​​​​​​​);



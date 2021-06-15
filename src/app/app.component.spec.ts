import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { booksReducer } from './state/books.reducer';
import { collectionReducer } from './state/collection.reducer';
import { GoogleBooksService } from './book-list/books.service';
import { By } from '@angular/platform-browser';

describe('BookCollectionComponent', () => {
let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;

beforeEach(async () => {
  TestBed.configureTestingModule({
    declarations: [AppComponent, BookListComponent, BookCollectionComponent],
    imports: [
      HttpClientTestingModule,
      StoreModule.forRoot({
        books: booksReducer,
        collection: collectionReducer,
      }),
    ],
    providers: [GoogleBooksService],
  }).compileComponents();

  fixture = TestBed.createComponent(AppComponent);
  component = fixture.debugElement.componentInstance;

  fixture.detectChanges();
});

function getCollection() {
  return fixture.debugElement.queryAll(By.css('.book-collection .book-item'));
}

function getBookList() {
  return fixture.debugElement.queryAll(By.css('.book-list .book-item'));
}
 
function getBookTitle(element:any) {
  return element?.query(By.css('p'))?.nativeElement?.textContent;
}
 
function click(element:any) {
  const el: HTMLElement = element?.nativeElement;
  el?.click();
  fixture.detectChanges();
}

describe('buttons should work as expected', () => {
  it('should add to collection when add button is clicked and remove from collection when remove button is clicked', () => {
    const addButton = (getBookList() && getBookList()[1]) ? getBookList()[1].query(
      By.css('[data-test=add-button]')
    ) : undefined;
 
    click(addButton);
    expect(getBookTitle(getCollection()[0])).toBe(undefined);

    const removeButton = (getCollection() && getCollection()[0]) ? getCollection()[0].query(
      By.css('[data-test=remove-button]')
    ) : undefined;
    click(removeButton);
 
    expect(getCollection().length).toBe(0);
  });
});

})


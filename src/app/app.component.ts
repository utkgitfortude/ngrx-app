import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from './state/books.selector';
import {
  addBook,
  removeBook,
  loadBooks,
} from './state/books.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  books$ : any = [this.store.pipe(select(selectBooks))];
  bookCollection$ : any = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadBooks());
    this.store.select(selectBooks).subscribe((data:any)=>{
      console.log(data, '$$$$$$$');
      this.books$ = data?.books;
    });
  }

  onAdd(bookId: any) {
    this.store.dispatch(addBook({ bookId }));
    if(this.books$ && this.books$.length){
      var index = this.books$.findIndex((x:any)=>{ return x.id==bookId })
    }
    if((index!=undefined && this.books$[index])){
      this.bookCollection$.push(this.books$[index]);
    }
  }

  onRemove(bookId: any) {
    this.store.dispatch(removeBook({ bookId }));
    if(this.bookCollection$ && this.bookCollection$.length){
      var index = this.bookCollection$.findIndex((x:any)=>{ return x.id==bookId })
    }
    if((index!=undefined && this.bookCollection$[index])){
      this.bookCollection$.splice(index,1);
    }
  }
}
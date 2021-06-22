import React, { Component } from "react";
import Book from './Book'


class BookShelf extends Component{
    render(){
      const {books, shelfTitle, updateShelf, shelfLable} = this.props
        return(
          
          <div className="bookshelf">
           <h2 className="bookshelf-title">{shelfTitle}</h2>
           <div className="bookshelf-books">
             <ol className="books-grid">              
               {
                 books.filter((book) => (book.shelf === shelfLable)).map((book)=>(
                  <Book key={book.title} book={book} updateShelf={updateShelf} bookShelf={book.shelf} />
                 )) 
               }
               
             </ol>
           </div>
        </div>
        );
    }
}

export default BookShelf; 
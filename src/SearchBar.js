import React , { Component } from "react";
import Book from "./Book";
import * as BookAPI from './BooksAPI';
import { Link } from "react-router-dom";


export const LIST_OPTIONS = [
  {
    value: "move",
    label: "Move to...",
    disabled: true,
  },
  {
    value: "currentlyReading",
    label: "Currently Reading",
    toShow: true,
  },
  {
    value: "wantToRead",
    label: "Want to Read",
    toShow: true,
  },
  {
    value: "read",
    label: "Read",
    toShow: true,
  },
  {
    value: "none",
    label: "None",
  },
];

class SearchBar extends Component {
    state={
      searchTerm :'', 
      result:[], 

    }

    handleSearch =(search)=>{
          this.setState(()=>({searchTerm : search}));

          if (search.length > 0){
            BookAPI.search(search)
            .then((result)=>{
                this.setState(()=>({
                  result , 
                }));     
          })
        }else{
          this.setState(()=>({
            result : []
          }))
        }
    }

    
    render(){
      const {showSearchPage, books,updateShelf} = this.props

           
        return(
            <div className="search-books">
            <div className="search-books-bar">
            <Link to={"/"}>
            <button className="close-search" onClick={showSearchPage}>
              Close
            </button>
          </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" 
                value={this.state.searchTerm}
                onChange={(event)=> this.handleSearch(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                  this.state.result.length > 0 ?
                  this.state.result.map((book , index) => {

                    const findBook = books.find((b) => b.id === book.id);

                    const bookShelf = findBook ? findBook.shelf : "none";
                    return (

                          <Book key={index} bookShelf={bookShelf} book={book} updateShelf={updateShelf}/>
                      )
                  }) :  ''
              }
              </ol>
            </div>
          </div>
        );
    }
}

export default SearchBar; 
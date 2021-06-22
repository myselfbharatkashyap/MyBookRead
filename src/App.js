import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBar , { LIST_OPTIONS } from './SearchBar'
import BookShelf from "./BookShelf";
import * as BookAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import { Route , Switch} from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false, 
    books:[]
   
  }

  getAllBooks(){
    BookAPI.getAll()
    .then((books)=>{ 
        this.setState(()=>({
          books,
         }))
    })

  }

  componentDidMount(){ 
   this.getAllBooks();
  }

  updateShelf= (book, shelf)=>{
    
    BookAPI.update(book, shelf)
    .then(()=>{
      this.getAllBooks();
    });
    

  }

  render() {
   
    return (
      <div className="app">
         <Switch>   
          <Route exact path="/search" >
              <SearchBar 
              showSearchPage={() => { this.setState({ showSearchPage: false }); }}
              books={this.state.books}
              updateShelf={this.updateShelf} />
          </Route> 
       
          <Route exact path="/" >
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>  
              {LIST_OPTIONS
              .filter((option) => option.toShow)
                .map(
                  (o, index) => {
                    return (
                      <BookShelf 
                        key={index} 
                        shelfTitle={o.label} 
                        shelfLable ={o.value}
                        books={this.state.books} 
                        updateShelf={this.updateShelf}
                      />
                    );
                  }
                )} 
                {/* <BookShelf shelfTitle="Want to Read" books={wantToRead} updateShelf={this.updateShelf}/> 
                <BookShelf shelfTitle="Read" books={read} updateShelf={this.updateShelf}/>  */}
              </div>         
            </div>
            <div className="open-search">
              <Link  to="/search">
                 <button
                  onClick={() => {
                    this.setState({ showSearchPage: true });
                  }}
               >
                 Add a book
               </button>
              </Link>
            </div>
          </div>
          </Route> 
        </Switch>
      </div>
      
    )
  }
}

export default BooksApp

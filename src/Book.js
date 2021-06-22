import React, { Component } from "react";
import  { LIST_OPTIONS } from './SearchBar'

class Book extends Component {

    render (){
        const {book, bookShelf} = this.props;       

      const  updatemyShelf =(shelf) =>{
            this.props.updateShelf(book, shelf);
             alert("Book shelf is update sucessfully!!!")
        }

        return(
            <li key={this.props.book.title}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ 
                        width: 128, height: 193, 
                        backgroundImage:`url(${this.props.book.imageLinks.thumbnail})`
                        }}></div>
                        
                      <div className="book-shelf-changer">
                        <select onChange={e=> updatemyShelf(e.target.value)} value={bookShelf !== undefined? bookShelf : 'none' }>
                            {LIST_OPTIONS.map((option, index)=>(
                                <option key={index} value={option.value} disabled={option.disabled}>{option.label}</option>
                            ))}
                        </select>
                      </div>
                    </div> 
                    <div className="book-title">{book.title}</div>
                    {
                    this.props.book.authors !== undefined ? ( this.props.book.authors.map((author ,index)=>(
                        <div className="book-authors" key={index}>{author}</div>
                    ))) : ''
                     
                }
                    
                  </div>
                  
                </li>
        );
    }
}

export default Book;
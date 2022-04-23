import React, {Component} from "react";
import libraryService from "../../../service/libraryService";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../../header/header'
import {Link} from "react-router-dom";

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    render() {
        return (
            <main>
                <Header/>
                <div className={"container"}>
                    <h3 className={"text-primary"}>Showing all books..</h3>
                    <Link to={"/books/add"} className={"btn btn-success"}>Add new book</Link>
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Id</th>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Available Copies</th>
                            <th scope={"col"}>Category</th>
                            <th scope={"col"}>Author</th>
                            <th scope={"col"}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.books.map(book => {
                            return (
                                <tr>
                                    <th scope={"row"}>{book.id}</th>
                                    <td>{book.name}</td>
                                    <td>{book.availableCopies}</td>
                                    <td>{book.category}</td>
                                    <td>{book.author.name} {book.author.surname}</td>
                                    <td>
                                        <Link to={`/books/edit/${book.id}`} className={"btn btn-primary btn-sm"}>Edit</Link>
                                        {/*<button className={"btn btn-primary btn-sm"}*/}
                                        {/*        onClick={() => this.editBook(book.id)}>Edit</button>*/}
                                        -
                                        <button className={"btn btn-danger btn-sm"}
                                                onClick={() => this.deleteBook(book.id)}>Delete</button>-
                                        <button className={"btn btn-success btn-sm"}
                                                onClick={() => this.takeBook(book.id)}>Mark as taken</button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </main>
        )
    }

    componentDidMount() {
        this.fetchBooks()
    }

    fetchBooks = () => {
        this.loadBooks()
    }
    loadBooks = () => {
        libraryService.findAllBooks()
            .then((data) =>
                this.setState({
                    books: data.data
                })
            )
    }
    takeBook = (id) => {
        libraryService.takeBook(id).then(() => this.loadBooks());
    }
    deleteBook = (id) => {
        libraryService.deleteBook(id).then(() => this.loadBooks());
    }
    editBook = (id) => {
        libraryService.editBook(id)
    }
}

export default Books;
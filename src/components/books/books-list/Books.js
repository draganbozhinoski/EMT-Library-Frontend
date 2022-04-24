import React, {Component} from "react";
import libraryService from "../../../service/libraryService";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../../header/header'
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            page:0,
            size:5
        }
    }

    render() {
        const offset = this.state.page * this.state.size
        const pageCount = Math.ceil(this.state.books.length / this.state.size)
        const endPage = offset+this.state.size
        const booksPaginated = this.state.books.slice(offset,endPage)
        // console.log(booksPaginated)
        return (
            <main>
                <Header/>
                <div className={"container"}>
                    {/*{booksPaginated.map(book => {*/}
                    {/*    return(*/}
                    {/*        <div>{book.name}</div>*/}
                    {/*        );*/}
                    {/*})}*/}
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
                        {booksPaginated.map(book => {
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
                    <ReactPaginate pageCount={pageCount}
                        onPageChange={this.pageChange}
                                   breakLabel={"..."}
                                   renderOnZeroPageCount={null}
                                   previousLabel={"< previous"}
                                   pageClassName={"ml-1"}
                                   pageRangeDisplayed={5}
                                   marginPagesDisplayed={2}
                                   containerClassName={"pagination m-2 justify-content-center"}
                                   previousClassName={"page-item"}
                                   nextClassName={"page-item"}
                                   previousLinkClassName={"page-link"}
                                   nextLinkClassName={"page-link"}
                                   pageLinkClassName={"page-link"}
                                   activeClassName={"active page-item"}
                                   activeLinkClassName={"page-link"}
                    />
                </div>
            </main>
        )
    }

    componentDidMount() {
        this.fetchBooks()
    }
    pageChange = (data) => {
        let selected = data.selected
        this.setState({
            page:selected
        })
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
            ).then(() => console.log(this.state.books))
    }
    takeBook = (id) => {
        libraryService.takeBook(id).then(() => this.loadBooks());
    }
    deleteBook = (id) => {
        libraryService.deleteBook(id).then(() => this.loadBooks());
    }
}

export default Books;
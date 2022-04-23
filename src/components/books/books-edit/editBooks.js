import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import libraryService from "../../../service/libraryService";
import {map} from "react-bootstrap/ElementChildren";
import Header from "../../header/header";

const EditBooks = (props) => {
    const id = useParams().id
    const [page,setPage] = useState(0)
    const [selectedBook,setSelectedBook] = useState({})
    const [categories, setCategories] = useState([])
    const [authors,setAuthors] = useState([])
    const [isLoadingAuthors,setIsLoadingAuthors] = useState(true)
    const [isLoadingCategories,setIsLoadingCategories] = useState(true)

    useEffect(() => {
        getBook(id)
            .then(res => {
                setSelectedBook(res.data);
                updateFormData({
                    ...formData,
                    name: selectedBook.name,
                    availableCopies: selectedBook.availableCopies,
                    category: selectedBook.category,
                    author: selectedBook.author
                });
            })
        fetchAuthors()
            .then(data => {
                setAuthors(data.data);
                setIsLoadingAuthors(false)
            })
        fetchCategories()
            .then(data => {
                setCategories(data.data);
                setIsLoadingCategories(false)
            })
    },[page])
    const history = useNavigate()
    const [formData, updateFormData] = useState({
        name: "undefined",
        availableCopies: 1,
        category: "NOVEL",
        author: 1
    })
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }
    const getBook = (id) => {
        return libraryService.findBookById(id)
    }
    const fetchCategories = () => {
        return libraryService.findAllCategories()
    }
    const fetchAuthors = () => {
        return libraryService.findAllAuthors()
    }
    const submitForm = (e) => {
        e.preventDefault()
        const name = formData.name?formData.name:selectedBook.name;
        const availableCopies = formData.availableCopies?formData.availableCopies:selectedBook.availableCopies;
        const category = formData.category?formData.category:selectedBook.category;
        const author = formData.author?formData.author:selectedBook.author.id;
        libraryService.updateBook(id,name,availableCopies,category,author)
        history("/books")
    }
    return(
        <main>
            <Header/>
            <div className={"container w-25 mx-auto pt-4"}>
                <form onSubmit={submitForm}>
                    <div className={"form-group pt-2"}>
                        <label htmlFor={"name"}>Enter book name: </label>
                        <input className={"form-control"} name="name" type={"text"} onChange={handleChange}
                               placeholder={"Enter book name.."} required defaultValue={selectedBook.name}/>
                    </div>
                    <div className={"form-group pt-2"}>
                        <label htmlFor={"availableCopies"}>Enter available copies: </label>
                        <input className={"form-control"} name="availableCopies" type={"number"} onChange={handleChange}
                               placeholder={"Enter initial available copies.."} required defaultValue={selectedBook.availableCopies}/>
                    </div>
                    {isLoadingCategories && <div>Loading categories..</div>}
                    {!isLoadingCategories &&
                    <div className={"form-group pt-2"}>
                        <label htmlFor={"category"}>Choose book category: </label>
                        <select name={"category"} className={"form-control"} onChange={handleChange}
                                defaultValue={selectedBook.category}>
                            {categories.map(cat => {
                                return (
                                    <option value={cat}>{cat}</option>
                                );
                            })
                            }
                        </select>
                    </div>
                    }
                    {isLoadingAuthors && <div>Loading authors..</div>}
                    {!isLoadingAuthors &&
                    <div className={"form-group pt-2"}>
                        <label htmlFor={"author"}>Choose book author: </label>
                        <select name={"author"} className={"form-control"} onChange={handleChange} defaultValue={selectedBook.author.id}>
                            {authors.map(author => {
                                return(
                                    <option value={author.id}>{author.name} {author.surname}</option>
                                );
                            })}
                        </select>
                    </div>
                    }
                    <div className={"pt-2 mx-auto w-50"}>
                        <button type={"submit"} className={"btn btn-primary w-100 pt-2"}>Save book</button>
                    </div>
                </form>
            </div>
        </main>
    );

}
export default EditBooks;

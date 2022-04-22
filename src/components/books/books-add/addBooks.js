import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import libraryService from "../../../service/libraryService";
import Header from '../../header/header'

const AddBooks = (props) => {
    const history = useNavigate()
    const [formData, updateFormData] = useState({
        name: "",
        availableCopies: 0,
        category: "NOVEL",
        author: 1,
    })
    const [categories, setCategories] = useState({
        categories: [],
    })
    useEffect(() => {
        console.log("TEst");
        fetchCategories()
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }
    const fetchCategories = () => {
        libraryService.findAllCategories().then(data => setCategories({
            categories: data.data,
        }))
    }
    const submitForm = () => {
        console.log("submitted")
    }

    return (
        <main>
            <Header/>
            <div className={"container w-25 mx-auto pt-4"}>
                <form onSubmit={submitForm}>
                    <div className={"form-group pt-2"}>
                        <label htmlFor={"name"}>Enter book name: </label>
                        <input className={"form-control"} name="name" type={"text"} onChange={handleChange}
                               placeholder={"Enter book name.."} required/>
                    </div>
                    <div className={"form-group pt-2"}>
                        <label htmlFor={"availableCopies"}>Enter available copies: </label>
                        <input className={"form-control"} name="availableCopies" type={"text"} onChange={handleChange}
                               placeholder={"Enter initial available copies.."} required/>
                    </div>
                    <div className={"form-group pt-2"}>
                        <label htmlFor={"category"}>Choose book category: </label>
                        <select name={"category"} className={"form-control"} onChange={handleChange}>
                            {/*    category*/}
                        </select>
                    </div>
                    <div className={"form-group pt-2"}>
                        <label htmlFor={"author"}>Choose book author: </label>
                        <select name={"author"} className={"form-control"} onChange={handleChange}>
                            {/*author*/}
                        </select>
                    </div>
                    <div className={"pt-2 mx-auto w-50"}>
                        <button type={"submit"} className={"btn btn-primary w-100 pt-2"}>Add book</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
export default AddBooks;
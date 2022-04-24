import axios from "../custom-axios/axios";

const libraryService = {
    findAllBooks: () => {
        return axios.get("/api/books");
    },
    findAllCategories: () => {
        return axios.get("/api/categories")
    },
    findAllAuthors: () => {
        return axios.get("/api/books/authors")
    },
    takeBook: (id) => {
        return axios.post(`/api/books/${id}/take`);
    },
    deleteBook: (id) => {
        return axios.delete(`/api/books/${id}/delete`)
    },
    saveBook: (name,availableCopies,category,author) => {
        return axios.post(`/api/books/save`, {
            "name": name,
            "availableCopies": availableCopies,
            "category": category,
            "author": author
        })
    },
    updateBook: (id,name,availableCopies,category,author) => {
        axios.put(`/api/books/${id}/update`, {
            "name": name,
            "availableCopies": availableCopies,
            "category": category,
            "author": author
        }).then(r => console.log(r))
    },
    findBookById: (id) => {
        return axios.get(`/api/books/${id}`)
    }
}
export default libraryService;
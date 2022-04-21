import axios from "../custom-axios/axios";

const libraryService = {
    findAllBooks: () => {
        return axios.get("/api/books");
    },
    findAllCategories: () => {
        return axios.get("/api/categories")
    },
    takeBook: (id) => {
        return axios.post(`/api/books/${id}/take`);
    },
    deleteBook: (id) => {
        return axios.delete(`/api/books/${id}/delete`)
    }
}
export default libraryService;
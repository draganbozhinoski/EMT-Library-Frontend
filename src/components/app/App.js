import './App.css';
import Books from '../books/books-list/Books'
import Categories from '../categories/Categories'
import AddBooks from "../books/books-add/addBooks";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import EditBooks from "../books/books-edit/editBooks";

function App() {
    return (
            <Router>
                <Routes>
                    <Route path={"/"} exact element={<Books/>}/>
                    <Route path={"/books/add"} exact element={<AddBooks/>}/>
                    <Route path={"/books/edit/:id"} exact element={<EditBooks/>}/>
                    <Route path={"/books"} exact element={<Books/>}/>
                    <Route path={"/categories"} exact element={<Categories/>}/>
                </Routes>
            </Router>
    )
}

export default App;

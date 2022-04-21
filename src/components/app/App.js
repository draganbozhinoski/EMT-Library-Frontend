import './App.css';
import Books from '../books/books'
import Categories from '../categories/categories'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
      <Router>
          <Routes>
              <Route path={"/"} exact element={<Books/>}/>
              <Route path={"/books"} exact element={<Books/>}/>
              <Route path={"/categories"} exact element={<Categories/>}/>
          </Routes>
      </Router>
  )
}

export default App;

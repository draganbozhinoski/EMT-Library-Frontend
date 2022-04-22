import React from 'react'
import {Link} from "react-router-dom";

const header = () => {
    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"} className={"navbar-brand ms-4"}>EMT Library</Link>
        <div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={"/books"} className={"nav-link"}>Books</Link>
                </li>
                <li className={"nav-item"}>
                    <Link to={"/categories"} className={"nav-link"}>Categories</Link>
                </li>
            </ul>
        </div>
    </nav>
            );
}
export default header;
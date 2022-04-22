import React, {Component, useState} from "react";
import libraryService from "../../service/libraryService";
import Header from '../header/header';

class categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    render() {
        return (
            <main>
                <Header/>
                <div className={"container"}>
                    <h3 className={"text-primary"}>Showing all categories..</h3>
                    <ul>
                        {this.state.categories.map(category => {
                            return (
                                <li>{category}</li>
                            )
                        })}
                    </ul>
                </div>
            </main>
        );
    }

    componentDidMount() {
        this.fetchCategories()
    }

    fetchCategories() {
        libraryService.findAllCategories().then((data) =>
            this.setState({
                categories: data.data
            })
        )
    }
}

export default categories;

import React, {Component} from "react";
import libraryService from "../../service/libraryService";
class categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }
    render() {
        return(
            <main>
                <h3 className={"text-primary"}>Showing all categories..</h3>
                <ul>
                    {this.state.categories.map(category => {
                        return(
                            <li>{category}</li>
                        )
                    })}
                </ul>
            </main>
        );
    }
    componentDidMount() {
        this.fetchCategories()
    }
    fetchCategories() {
        libraryService.findAllCategories().then((data) =>
            this.setState( {
                categories: data.data
            })
        )
    }
}
export default categories;

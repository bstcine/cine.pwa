import React, {Component} from 'react'
import Category from './Category'

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {categorys, ...props} = this.props
        return (
            <div className="category-list">
                {
                    categorys.map((category, i) => <Category key={i} category={category} {...props}/>)
                }
            </div>
        );
    }

}
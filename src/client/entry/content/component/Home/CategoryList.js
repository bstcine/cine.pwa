import React, {Component} from 'react';
import Category from './Category';

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
    }

    renderCategorys() {
        let {categorys, ...props} = this.props;
        if (categorys && categorys.length) {
            return categorys.map((category, i) => {
                return <Category key={i} category={category} {...props} />;
            });
        }
    }

    render() {
        console.log('CategoryList');
        return <div className="category-list">{this.renderCategorys()}</div>;
    }
}

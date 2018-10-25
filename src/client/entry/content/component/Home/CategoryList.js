import React, { Component } from 'react';
import Category from './Category';

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
    }

    renderCategorys() {
        let { categorys, ...props } = this.props;
        if (categorys && categorys.length) {
            return categorys.map((category, i) => {
                return <Category key={i} category={category} {...props} />;
            });
        } else {
            return (
                <div className="category-not-found">
                    <img
                        src={require('../../asset/image/ico_search_content.png')}
                        alt="not-found"
                    />
                    当前分类没有对应的课程，请更换其他条件查找
                </div>
            );
        }
    }

    render() {
        console.log('CategoryList');
        return <div className="category-list">{this.renderCategorys()}</div>;
    }
}

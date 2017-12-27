import React, {Component} from 'react'
import Category from './Category'

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

    }

    renderCategorys(categorys,...props){
        if(categorys && categorys.length){
            return categorys.map((category, i) => <Category key={i} category={category} {...props}/>)
        }else{
            return <div className="category-not-found"> 暂无匹配的课程（文案+图片待提供）</div>
        }
    }

    render() {
        let {categorys, ...props} = this.props
        return (
            <div className="category-list">
                {
                    this.renderCategorys(categorys,...props)
                }
            </div>
        );
    }

}
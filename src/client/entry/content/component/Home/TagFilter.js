import React, {Component} from 'react'
import {getParam} from "@/util/urlUtil";

export default class TagFilter extends Component {

    constructor(props) {
        super(props);
        this.tagClick = this.tagClick.bind(this);
    }

    renderP1Tags() {
        return this.props.tags.map((item, i) => {
            return (
                <li key={i} className="p1-tag">
                    {item.name}
                    <ul className="p2-tags">
                        {this.renderP2Tags(i, item.children.slice())}
                    </ul>
                </li>
            )
        })
    }

    renderP2Tags(p1_level, items) {
        items.unshift({"id": "", "name": "全部"})
        return items.map((item, i) => {
            const label = item.label ? (<span className="label">{item.label}</span>) : ""
            const className = this.props.tagids.includes(item.id) ? "p2-tag active" : "p2-tag"
            return (
                <li key={i} className={className}
                    onClick={(e) => this.tagClick(p1_level, item.id, e)}>{item.name} {label}</li>
            )
        })
    }

    tagClick(p1_level, tag_id) {
        let obj = {}
        obj[`tag_${p1_level}`] = tag_id
        let paramsObj = Object.assign(getParam(), obj)
        let arr = []
        for (let [key, value] of Object.entries(paramsObj)) {
            if (value) arr.push(`${key}=${value}`)
        }
        let search = arr.join('&')
        this.props.history.push(`/?${search}`)
    }

    render() {
        console.log(`TagFilter`)
        return (
            <div className="tag-filter">
                <ul className="p1-tags">
                    {this.renderP1Tags()}
                </ul>
            </div>
        );
    }

}
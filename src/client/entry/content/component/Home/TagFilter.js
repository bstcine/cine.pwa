import React, { Component } from 'react';
import { getParam } from '@/util/urlUtil';

export default class TagFilter extends Component {
    constructor(props) {
        super(props);
        this.tagClick = this.tagClick.bind(this);
    }

    renderP1Tags() {
        return this.props.tags.map((item, i) => {
            return (
                <li key={i} className="p1-tag">
                    <span>{item.text}</span>
                    <ul className="p2-tags">
                        {this.renderP2Tags(item.id, item.children.slice())}
                    </ul>
                </li>
            );
        });
    }

    renderP2Tags(parent_id, items) {
        const { selectedTags } = this.props;
        let ids = [];
        selectedTags &&
            selectedTags.length &&
            selectedTags.forEach(item => {
                if (item.pid === parent_id) {
                    ids.push(item.id);
                }
            });
        items.unshift({ id: '', text: '全部', attributes: { parent_id } });

        return items.map((item, i) => {
            const label =
                item.attributes && item.attributes.label ? (
                    <span className="label">{item.attributes.label}</span>
                ) : (
                    ''
                );
            let className = 'p2-tag';
            if (ids.length) {
                if (ids.includes(item.id)) {
                    className += ' active';
                }
            } else {
                if (item.id === '') {
                    className += ' active';
                }
            }
            return (
                <li
                    key={i}
                    className={className}
                    onClick={e => this.tagClick(item, e)}
                >
                    {item.text} {label}
                </li>
            );
        });
    }

    tagClick(item) {
        let obj = {};
        obj[`tag_${item.attributes.parent_id}`] = item.id;
        let paramsObj = Object.assign(getParam(), obj);
        let arr = [];
        for (let [key, value] of Object.entries(paramsObj)) {
            if (value) arr.push(`${key}=${value}`);
        }
        let search = arr.join('&');
        this.props.history.push(`/?${search}`);
    }

    render() {
        console.log(`TagFilter`);
        return (
            <div className="tag-filter">
                <ul className="p1-tags">{this.renderP1Tags()}</ul>
            </div>
        );
    }
}

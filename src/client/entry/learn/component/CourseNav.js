import React, { Component } from 'react';
import classNames from 'classnames';
import { CPanel, CIcon } from '@/component/_base';

const Lesson = ({ lesson }) => {
    return (
        <li className="nav__lesson">
            <span>{lesson.name}</span>
            <CIcon>done</CIcon>
        </li>
    );
};

class NavChapter extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        let ele = this.ref.current;
        if (!ele) return;

        let height = ele.scrollHeight;
        console.log(height);

        if (ele.classList.contains('nav__lessons--active')) {
            requestAnimationFrame(() => {
                ele.style.height = height + 'px';
                requestAnimationFrame(() => {
                    ele.style.height = '0';
                    ele.classList.remove('nav__lessons--active');
                });
            });
        } else {
            requestAnimationFrame(() => {
                ele.style.height = '0px';
                requestAnimationFrame(() => {
                    ele.style.height = height + 'px';
                    ele.classList.add('nav__lessons--active');
                });
            });
        }
    }

    render() {
        const { chapter, active_id } = this.props;

        return (
            <li className="nav__chapter" onClick={this.onClick}>
                <CIcon>ci-list_book</CIcon>
                <span>{chapter.name}</span>
                <ul
                    className={classNames('nav__lessons', {
                        'nav__lessons--active': chapter.children.some(item => {
                            console.log(item.id);

                            return item.id === active_id;
                        }),
                    })}
                    ref={this.ref}>
                    {chapter.children.map(item => (
                        <Lesson key={item.id} lesson={item} />
                    ))}
                </ul>
            </li>
        );
    }
}

const CourseNav = ({ tree, active_id }) => {
    console.log(tree);

    return (
        <CPanel title="课程目录" className="course__nav">
            {tree &&
                tree.length && (
                <ul className="nav__chapters">
                    {tree.map(item => (
                        <NavChapter
                            key={item.id}
                            chapter={item}
                            active_id={active_id}
                        />
                    ))}
                </ul>
            )}
        </CPanel>
    );
};

export default CourseNav;

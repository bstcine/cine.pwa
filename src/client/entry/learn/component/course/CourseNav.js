import React, { Component } from 'react';
import classNames from 'classnames';
import { CPanel, CIcon } from '@/component/_base';
import { Link } from 'react-router-dom';
import { animation } from '@/util/_base/exCssUtil';

/**
 * 左侧导航
 */
const CourseNav = ({ tree, activeId }) => {
    console.log('CourseNav render');

    return (
        <CPanel title="课程目录" className="course__nav">
            {tree && tree.length && (
                <ul className="nav__chapters">
                    {tree.map(item => (
                        <NavChapter
                            key={item.id}
                            chapter={item}
                            activeId={activeId}
                        />
                    ))}
                </ul>
            )}
        </CPanel>
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

        if (ele.classList.contains('nav__lessons--active')) {
            animation(ele, 'height', height + 'px', '0', () => {
                ele.classList.remove('nav__lessons--active');
            });
        } else {
            animation(ele, 'height', '0', height + 'px', () => {
                ele.classList.add('nav__lessons--active');
            });
        }
    }

    render() {
        const { chapter, activeId } = this.props;

        return (
            <li className="nav__chapter" onClick={this.onClick}>
                <CIcon>ci-list_book</CIcon>
                <span>{chapter.name}</span>
                <ul
                    className={classNames('nav__lessons', {
                        'nav__lessons--active': chapter.children.some(
                            item => item.id === activeId
                        ),
                    })}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                    ref={this.ref}
                >
                    {chapter.children.map(item => (
                        <Lesson
                            key={item.id}
                            lesson={item}
                            active={item.id === activeId}
                        />
                    ))}
                </ul>
            </li>
        );
    }
}

const Lesson = ({ lesson, active }) => {
    return (
        <li
            className={classNames('nav__lesson', {
                'nav__lesson--active': active,
            })}
        >
            {lesson.type !== '5' ? (
                <Link
                    to={`/learn/course2/${lesson.lesson_id}?lesson_id=${lesson.id}`}
                >
                    <span>{lesson.name}</span>
                    {lesson.learn_status === '1' && (
                        <CIcon>query_builder</CIcon>
                    )}
                    {lesson.learn_status === '2' && <CIcon>done</CIcon>}
                </Link>
            ) : (
                <a href={lesson.redirect} target="_blank">
                    <span>{lesson.name}</span>
                    {lesson.learn_status === '1' && (
                        <CIcon>query_builder</CIcon>
                    )}
                    {lesson.learn_status === '2' && <CIcon>done</CIcon>}
                </a>
            )}
        </li>
    );
};

export default CourseNav;

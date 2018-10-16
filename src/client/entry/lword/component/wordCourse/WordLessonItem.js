import React from 'react';
import { svgStar } from '@/constant/svg';

const WordLessonItem = ({ item, actions }) => {
    let quizClassName = 'default';
    let quizScore = '-';
    let star = '';
    if (item.wQuizScore !== -1) {
        quizScore = item.wQuizScore + '%';
        if (item.wQuizScore < 90) {
            quizClassName = 'quiz';
        } else if (item.wQuizScore < 100) {
            quizClassName = 'quiz90';
        } else {
            quizClassName = 'quiz90';
            star = <span className="star5">{svgStar}</span>;
        }
    }
    const className = quizClassName + (item.isLastVisit ? ' lastVisit' : '');
    const classNameMiddle = quizClassName === 'quiz90' ? 'middle90' : 'middle';
    const classNameScore = quizClassName === 'quiz90' ? 'score90' : '';
    const classNameNO = quizClassName === 'quiz90' ? 'no90' : 'no';
    const indexs = item.value.split('-');
    const herf = `lesson_id=${item.value}`;
    return (
        <React.Fragment>
            <a href={'/lword?' + herf} >
                <div className={'lesson ' + className} id={`l${indexs[0]}`}>
                    <div className="top">
                        <div className={classNameNO}>第{item.id}组</div>
                        <div className="fromto">{item.value}</div>
                    </div>

                    <div className={classNameMiddle} />
                    <div className="bottom">
                        <div className="star">{star}</div>
                        <div className={'quizScore ' + classNameScore}>
                            {quizScore}
                        </div>
                        <div className="quiz">测试成绩</div>
                    </div>
                </div>
            </a>
        </React.Fragment>
    );
};

export default WordLessonItem;

import React from 'react';
/**
 * 句子改错
 */
const QuestionFormat3 = ({no, id, title}) => {
    return (
        <div className="questionformat questionformat3">
            <div className="titlewrap">
                <span className="questionno">{no}. </span>
                <div className="title" dangerouslySetInnerHTML={{ __html: title}} />
            </div>
            <ul className="options">
                <li className="option">
                    <input id={`q${id}o1`} type="radio" name={`q_${id}`} value={1} />
                    <label htmlFor={`q${id}o1`}><span /> A. 正确</label>
                </li>
                <li className="option">
                    <input id={`q${id}o2`} type="radio" name={`q_${id}`} value={0} />
                    <label htmlFor={`q${id}o2`}><span />B. 错误</label>
                </li>
            </ul>
            <div className="answer">
                <div className="tips">翻译</div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
    );
};


export default QuestionFormat3;
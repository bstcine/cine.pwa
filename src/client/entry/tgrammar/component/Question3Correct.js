import React from 'react';
/**
 * 句子改错
 */
const Question3Correct = ({no, id, title, selectValue, onChange}) => {
    console.log('Question3Correct render');
    return (
        <div className="questionformat questionformat3">
            <div className="titlewrap">
                <span className="questionno">{no}.</span>
                <div className="title" dangerouslySetInnerHTML={{__html: title}} />
            </div>
            <ul className="options">
                <li className="option">
                    <input id={`q${id}o1`} type="radio" name={`q_${id}`} value={1} onChange={onChange} />
                    <label htmlFor={`q${id}o1`}>
                        <span />A. 正确
                    </label>
                </li>
                <li className="option">
                    <input id={`q${id}o2`} type="radio" name={`q_${id}`} value={0} onChange={onChange} />
                    <label htmlFor={`q${id}o2`}>
                        <span />B. 错误
                    </label>
                </li>
            </ul>
            <div className="answer">
                <div className="tips">{(!selectValue || selectValue === '1') ? '翻译' : '修正错误'}：</div>
                <textarea className="answerarea" name="" id="" />
            </div>
        </div>
    );
};

export default Question3Correct;

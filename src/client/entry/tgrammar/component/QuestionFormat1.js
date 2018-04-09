import React from 'react';
/**
 * 1:单选题
 */
const QuestionFormat1 = ({no, id, title, options}) => {
    return (
        <div className="questionformat questionformat1">
            <span className="questionno">{no}. </span>
            <div className="title" dangerouslySetInnerHTML={{ __html: title}} />
            <ul className="options">
                {options.map((option, i) => {
                    return (
                        <li key={id + i} className="option">
                            <input id={`q${id}o${i}`} type="radio" name={`q_${id}`} />
                            <label htmlFor={`q${id}o${i}`}><span /> {option.content}</label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default QuestionFormat1;

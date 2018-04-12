import React from 'react';
/**
 * 1:单选题
 */
const Question1ChooseOne = ({no, id, title, options, select_value, onChange}) => {
    console.log('Question1ChooseOne render');
    return (
        <div className="questionformat questionformat1">
            <div className="titlewrap">
                <span className="questionno">{no}.</span>
                <div className="title" dangerouslySetInnerHTML={{ __html: title}} />
            </div>
            <ul className="options">
                {options.map((option, i) => {
                    return (
                        <li key={id + i} className="option">
                            <input id={`q${id}o${i}`} type="radio" name={`q_${id}`} onChange={onChange} value={i} checked={select_value === String(i)} />
                            <label htmlFor={`q${id}o${i}`}><span /> {option.content}</label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Question1ChooseOne;

import React from 'react';

const QuestionFormat1 = ({id, title, options}) => {
    return (
        <div>
            <div className="title">{title}</div>
            <ul className="options">
                {options.map((option, i) => {
                    return (
                        <li key={i} className="option">
                            <radio id={`q${id}o${i}`} name={`q${id}`} />
                            <lable htmlFor={`q${id}o${i}`}>{option.content}</lable>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default QuestionFormat1;

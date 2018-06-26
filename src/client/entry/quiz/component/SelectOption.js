import React from 'react';
import classNames from 'classnames';
const optionMap = { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G' };

const optionText = (index, content) => {
    if (typeof index !== 'number') {
        return content;
    }
    return content ? optionMap[index] + '. ' + content : optionMap[index];
};

const SelectOption = ({
    index,
    name,
    className = 'option',
    value,
    content,
    checked,
    readOnly,
    onChange,
}) => {
    return (
        <li
            className={classNames(className, {
                checked,
            })}>
            <label>
                <input
                    type="radio"
                    name={name}
                    onChange={onChange}
                    readOnly={readOnly}
                    value={value}
                    checked={checked}
                />
                <span /> {optionText(index, content)}
            </label>
        </li>
    );
};

export default SelectOption;

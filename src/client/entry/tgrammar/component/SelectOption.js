import React from 'react';
import classNames from 'classnames';
const optionMap = { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G' };

const SelectOption = ({
    index,
    name,
    value,
    content,
    checked,
    readOnly,
    onChange,
}) => {
    return (
        <li className={classNames('option', { checked })}>
            <label>
                <input
                    type="radio"
                    name={name}
                    onChange={onChange}
                    readOnly={readOnly}
                    value={value}
                    checked={checked}
                />
                <span />{' '}
                {content ? optionMap[index] + '. ' + content : optionMap[index]}
            </label>
        </li>
    );
};

export default SelectOption;

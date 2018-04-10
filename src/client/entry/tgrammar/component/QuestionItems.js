import React from 'react';
import Question1ChooseOne from './Question1ChooseOne';
import Question3Correct from './Question3Correct';
import Question10Desc from './Question10Desc';
import Question11ReadDesc from './Question11ReadDesc';

const QuestionItems = ({items}) => {
    let no = 0;
    return (
        <div className="questionitems" >
            {items.map((item, i) => {
                if (item.format === 1 || item.format === 3) no++;
                switch (item.format) {
                    case 1:
                        return (
                            <Question1ChooseOne
                                no={no}
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                options={item.answers}
                            />
                        );
                    case 3:
                        return (
                            <Question3Correct
                                no={no}
                                key={item.id}
                                id={item.id}
                                title={item.title}
                            />
                        );
                    case 10:
                        return (
                            <Question10Desc no={no} key={item.id} title={item.title} />
                        );
                    case 11:
                        return (
                            <Question11ReadDesc no={no} key={item.id} title={item.title} />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default QuestionItems;
import React from 'react';
import QuestionFormat1 from './QuestionFormat1';
import QuestionFormat3 from './QuestionFormat3';
import QuestionFormat10 from './QuestionFormat10';
import QuestionFormat11 from './QuestionFormat11';

const QuestionItems = ({items}) => {
    let no = 0;
    return (
        <div className="questionitems" >
            {items.map((item, i) => {
                if (item.format === 1 || item.format === 3) no++;
                switch (item.format) {
                    case 1:
                        return (
                            <QuestionFormat1
                                no={no}
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                options={item.answers}
                            />
                        );
                    case 3:
                        return (
                            <QuestionFormat3
                                no={no}
                                key={item.id}
                                id={item.id}
                                title={item.title}
                            />
                        );
                    case 10:
                        return (
                            <QuestionFormat10 no={no} key={item.id} title={item.title} />
                        );
                    case 11:
                        return (
                            <QuestionFormat11 no={no} key={item.id} title={item.title} />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default QuestionItems;
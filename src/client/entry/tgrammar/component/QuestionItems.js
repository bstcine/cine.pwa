import React from 'react';
import Question10Desc from './Question10Desc';
import Question11ReadDesc from './Question11ReadDesc';
import Question1ChooseOneContainer from '../container/Question1ChooseOneContainer';
import Question3CorrectContainer from '../container/Question3CorrectContainer';

const QuestionItems = ({questions, answersById}) => {
    console.log('QuestionItems render');
    let no = 0;
    return (
        <div className="questionitems">
            {questions.map((item, i) => {
                if (item.format === 1 || item.format === 3) no++;
                switch (item.format) {
                    case 1: {
                        let answer = answersById[item.id];
                        let select_value;
                        if (answer) {
                            select_value = answer.select_value;
                        }
                        return (
                            <Question1ChooseOneContainer
                                no={no}
                                id={item.id}
                                key={item.id}
                                question_id={item.id}
                                title={item.title}
                                options={item.answers}
                                select_value={select_value}
                            />
                        );
                    }
                    case 3: {
                        let answer = answersById[item.id];
                        let select_value;
                        let text_value;
                        if (answer) {
                            select_value = answer.select_value;
                            text_value = answer.text_value;
                        }
                        return (
                            <Question3CorrectContainer
                                no={no}
                                id={item.id}
                                key={item.id}
                                question_id={item.id}
                                title={item.title}
                                select_value={select_value}
                                text_value={text_value}
                            />
                        );
                    }
                    case 10:
                        return <Question10Desc id={item.id} no={no} key={item.id} title={item.title} />;
                    case 11:
                        return <Question11ReadDesc id={item.id} no={no} key={item.id} title={item.title} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default QuestionItems;

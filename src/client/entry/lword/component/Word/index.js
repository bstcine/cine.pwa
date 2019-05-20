/**
 * Created by lidangkun on 2018/7/26.
 */
import React from 'react';
import '../../asset/style/Word.less';
import WordHeader from '../WordHeader';
import WordBody from './WordBody';

class Word extends React.PureComponent {
    render() {
        let { param, result, quizAction, listAction, actions } = this.props;
        return (
            <div className="wordContent">
                <WordHeader sourceType="0" param={param} name={result.name} parentDictCategoryId={result.parent_dict_category_id}/>
                <WordBody
                    result={result}
                    quizAction={quizAction}
                    listAction={listAction}
                    actions={actions}
                />
            </div>
        );
    }
}

export default Word;

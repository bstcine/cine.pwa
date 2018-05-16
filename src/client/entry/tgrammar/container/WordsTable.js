import { connect } from 'react-redux';
import WordsTable from '../component/WordsTable';

const mapStateToProps = (state, ownProps) => {
    const { statsContentStuQuizWordList } = state;

    return {
        list:
            !statsContentStuQuizWordList || !statsContentStuQuizWordList.word
                ? []
                : statsContentStuQuizWordList.word,
    };
};

export default connect(mapStateToProps)(WordsTable);

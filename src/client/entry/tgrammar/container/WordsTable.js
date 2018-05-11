import { connect } from 'react-redux';
import WordsTable from '../component/WordsTable';

const mapStateToProps = (state, ownProps) => {
    const { statsContentStuQuizWordList } = state;

    if (!statsContentStuQuizWordList || !statsContentStuQuizWordList.word) return { list: [] };

    return {
        list: statsContentStuQuizWordList.word.slice(0, 200),
    };
};

export default connect(mapStateToProps)(WordsTable);

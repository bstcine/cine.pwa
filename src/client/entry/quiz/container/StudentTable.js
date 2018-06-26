import { connect } from 'react-redux';
import StudentTable from '../component/StudentTable';

const mapStateToProps = (state, ownProps) => {
    const { stuQuizGrammarAndWordList } = state;

    return {
        list: stuQuizGrammarAndWordList,
    };
};

export default connect(mapStateToProps)(StudentTable);

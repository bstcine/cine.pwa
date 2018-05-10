import { connect } from 'react-redux';
import WordsTable from '../component/WordsTable';

const mapStateToProps = (state, ownProps) => {
    const { statsContentWordList } = state;
    return {
        list: statsContentWordList,
    };
};

export default connect(mapStateToProps)(WordsTable);

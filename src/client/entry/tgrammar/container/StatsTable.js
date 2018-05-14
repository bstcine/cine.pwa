import { connect } from 'react-redux';
import StatsTable from '../component/StatsTable';

const mapStateToProps = (state, ownProps) => {
    const { statsContentStuQuizWordList } = state;
    return {
        list: statsContentStuQuizWordList.quiz,
    };
};

export default connect(mapStateToProps)(StatsTable);

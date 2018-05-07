import { connect } from 'react-redux';
import StatsTable from '../component/StatsTable';

const mapStateToProps = (state, ownProps) => {
    const { statsContentQuizList } = state;
    return {
        list: statsContentQuizList,
    };
};

export default connect(mapStateToProps)(StatsTable);

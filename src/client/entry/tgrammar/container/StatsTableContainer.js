import {connect} from 'react-redux';
import StatsTable from '../component/StatsTable';

const mapStateToProps = (state, ownProps) => {
    const {statsQuizList} = state;
    return {
        list: statsQuizList
    };
};

export default connect(mapStateToProps)(StatsTable);

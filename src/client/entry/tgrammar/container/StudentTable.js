import { connect } from 'react-redux';
import StudentTable from '../component/StudentTable';

const mapStateToProps = (state, ownProps) => {
    const { statsContentStuQuizWordList } = state;

    return {
        list: statsContentStuQuizWordList,
    };
};

export default connect(mapStateToProps)(StudentTable);

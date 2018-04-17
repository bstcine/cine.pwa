import {connect} from 'react-redux';
import Question10CommonDesc from '../component/Question10CommonDesc';

const mapStateToProps = (state, ownProps) => {
    let {questionsById} = state;
    let id = ownProps.item.id;
    let prop = {item: questionsById[id]};
    return prop;
};

export default connect(mapStateToProps)(Question10CommonDesc);

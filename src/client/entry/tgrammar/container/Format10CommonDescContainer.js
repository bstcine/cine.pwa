import { connect } from 'react-redux';
import Format10CommonDesc from '../component/Format10CommonDesc';

const mapStateToProps = (state, ownProps) => {
    let { questionsById } = state;
    let id = ownProps.item.id;
    let prop = { item: questionsById[id] };
    return prop;
};

export default connect(mapStateToProps)(Format10CommonDesc);

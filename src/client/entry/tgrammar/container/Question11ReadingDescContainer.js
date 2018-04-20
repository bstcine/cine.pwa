import { connect } from 'react-redux';
import Question11ReadingDesc from '../component/Question11ReadingDesc';

const mapStateToProps = (state, ownProps) => {
    let { questionsById } = state;
    let id = ownProps.item.id;
    let prop = { item: questionsById[id] };
    return prop;
};

export default connect(mapStateToProps)(Question11ReadingDesc);

import { connect } from 'react-redux';
import Format11ReadingDesc from '../component/Format11ReadingDesc';

const mapStateToProps = (state, ownProps) => {
    let { questionsById } = state;
    let id = ownProps.item.id;
    let prop = { item: questionsById[id] };
    return prop;
};

export default connect(mapStateToProps)(Format11ReadingDesc);

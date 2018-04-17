import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    let {quiz} = state;
    return {title: quiz.name, limit: 75, count: quiz.count};
};

const Title = ({title, date, limit, count}) => {
    console.log('Title render');
    return (
        <div className="title">
            <h1>{title}</h1>
            <div className="metas">
                <span className="meta">做题时间：{date}</span>
                <span className="meta">限时：{75}分钟</span>
                <span className="meta right">共{count}题</span>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Title);

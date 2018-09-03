import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Achieve from '../component/achieve';
import * as learnAction from '@/action/learnAction';
import { getParam } from '@/util/urlUtil';

const mapStateToProps = state => {
    const { taskShareRedu } = state;
    return { taskShareRedu };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(learnAction, dispatch),
});

class AchievePage extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            img: null,
        };
    }

    componentDidMount() {
        this.props.actions.fetchTaskShare({ user_id: getParam().user_id });
    }

    componentDidUpdate(prevProps, prevState) {
        const ele = this.ref.current.ref.current;
        if (!prevProps.taskShareRedu && this.props.taskShareRedu) {
            console.log('iv');

            html2canvas(ele, {
                useCORS: true,
            }).then(canvas => {
                this.setState({
                    img: canvas.toDataURL(),
                });
                setTimeout(() => {
                    alert('长按保存图片，去朋友圈炫耀一下!');
                }, 1000);
            });
        }
    }

    render() {
        const data = this.props.taskShareRedu;
        return <Achieve ref={this.ref} img={this.state.img} {...data} />;
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AchievePage)
);

import React from 'react';

export default class End extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');

        let score = props.score ? props.score : 0;

        let hint = '希望下次会更好！';
        let hintStyle = 'red';
        if (score >= 60 && score <= 79) {
            hint = '继续加油哦！';
            hintStyle = 'green';
        } else if (score >= 80 && score <= 99) {
            hint = '满分就在前方！';
            hintStyle = 'green';
        } else if (score == 100) {
            hint = '超级棒！继续保持！';
            hintStyle = 'green';
        }

        this.state = { score: score, hint: hint, hintStyle: hintStyle };
    }

    render() {
        return (
            <div className="card-end">
                <div className="hint">
                    本次测试得分：<span className={this.state.hintStyle}>
                        {this.state.score}
                    </span>{' '}
                    分，{this.state.hint}
                </div>

                <div className="todo">
                    <button className="again" onClick={this.props.again}>
                        再测一次
                    </button>
                    <button className="exit" onClick={this.props.exit}>
                        答题结束
                    </button>
                </div>
            </div>
        );
    }
}

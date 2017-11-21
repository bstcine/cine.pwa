import React from 'react';
import * as util from '../../util'
import * as Service from '../../service/word'

export default class Report extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            report:{},
            lessons:[]
        }
    }

    componentWillMount() {
        Service.queryContentWordResult({id: util.getUrlParam('id')}).then((result) => {
            this.setState({
                report:result.statsContentWord,
                lessons:result.recommendLessons
            })
        })

    }

    render() {
        return (
            <div>
                <p>你当前的词汇量约为</p>
                <p>{this.state.report.vocab}</p>
                <ul>
                    {this.state.lessons.map(function (lesson) {
                        return <li>{lesson.name}</li>
                    })}
                </ul>
            </div>
        )
    }
}


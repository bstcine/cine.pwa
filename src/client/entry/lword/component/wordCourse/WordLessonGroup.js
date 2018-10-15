import React from 'react';
import { CCardContainer, CCard, CIcon } from '@/component/_base';
import WordLessonItem from './WordLessonItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

class WordLessonG extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            expandStatus: this.props.expanded ? 1 : 0,
            originalExpanded: this.props.expanded,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.expanded !== prevState.originalExpanded) {
            return {
                originalExpanded: nextProps.expanded,
                expandStatus: nextProps.expanded ? 1 : 0,
            };
        } else {
            return null;
        }
    }

    onChange(course) {
        const expandStatus = this.state.expandStatus === 1 ? 0 : 1;
        this.setState({ expandStatus: expandStatus });
    }

    render() {
        const { lessons, layout, title } = this.props;
        let lessonList = <div></div>;
        const panelClass = this.state.originalExpanded ? 'PanelSelected' : '';
        if (this.state.expandStatus === 1) {
            lessonList = lessons.map((wordLesson, i) => {
                return (
                    <CCard key={i} hover="lighten">
                        <WordLessonItem item={wordLesson} />
                    </CCard>
                );
            });
        }
        return (
            <ExpansionPanel
                expanded={this.state.expandStatus === 1}
                onChange={this.onChange}>
                <ExpansionPanelSummary expandIcon={<CIcon>expand_more</CIcon>}>
                    <div className={panelClass}>{title}</div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <CCardContainer layout={layout} gap="large">
                        {lessonList}
                    </CCardContainer>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default WordLessonG;

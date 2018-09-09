import React from 'react';
import { CCardContainer, CCard, CIcon } from '@/component/_base';
import WordLessonItem from './WordLessonItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

const WordLessonList = ({ lessons, layout, lastVisitID, groupCount }) => {
    // const count = lessons.length / 5;
    const exL = 2;// + lastVisitID / 2000;
    const ls1 = lessons;
    const ls2 = lessons;
    const ls3 = lessons;
    const ls4 = lessons;
    const ls5 = lessons;

    return (
        <React.Fragment>
            <WordLessonG lessons={ls1} layout={layout} expanded={exL === 1} />
            <WordLessonG lessons={ls2} layout={layout} expanded={exL === 2} />
            <WordLessonG lessons={ls3} layout={layout} expanded={exL === 3} />
            <WordLessonG lessons={ls4} layout={layout} expanded={exL === 4} />
            <WordLessonG lessons={ls5} layout={layout} expanded={exL === 5} />
        </React.Fragment>
    );
};

class WordLessonG extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            expandStatus: this.props.expanded ? 1 : 0,
        };
    }

    onChange(course) {
        const expandStatus = this.state.expandStatus === 1 ? 0 : 1;
        this.setState({ expandStatus: expandStatus });
    }

    render() {
        const { lessons, layout } = this.props;
        let lessonList = lessons.map((wordLesson, i) => {
            return (
                <CCard key={i} hover="lighten">
                    <WordLessonItem item={wordLesson} />
                </CCard>
            );
        });
        return (
            <ExpansionPanel
                expanded={this.state.expandStatus === 1}
                onChange={this.onChange}>
                <ExpansionPanelSummary expandIcon={<CIcon>play_arrow</CIcon>}>
                    General settings
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

export default WordLessonList;

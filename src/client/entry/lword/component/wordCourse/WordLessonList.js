import React from 'react';
import WordLessonG from './WordLessonGroup';

const WordLessonList = ({ lessons, layout, lastVisitID }) => {
    const groupCount = 10;
    const groupLessonCount = lessons.length / groupCount;
    const groupWordCount = groupLessonCount * 50;
    const exL = 1 + parseInt(parseInt(lastVisitID, 10) / groupWordCount, 10);

    let lss = [];
    for (let g = 0; g < groupCount; g++) {
        let ls = [];
        lss.push(ls);

        for (
            let i = groupLessonCount * g;
            i < groupLessonCount * (1 + g);
            i++
        ) {
            const item1 = lessons[i];
            lss[g].push(item1);
        }
    }

    let wordLessonGs = lss.map((ls, i) => {
        const title = ` ${i * groupWordCount + 1}-${(i + 1) * groupWordCount}`;
        return (
            <WordLessonG
                key={i}
                lessons={ls}
                layout={layout}
                title={`善恩核心10000词汇: ${title}`}
                expanded={exL === i + 1}
            />
        );
    });

    return <React.Fragment>{wordLessonGs}</React.Fragment>;
};

export default WordLessonList;

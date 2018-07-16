import React from 'react';
import "../../asset/style/vocabularyTask.less";
import VocabularyItem from './vocabularyItem';
import { addParam } from '@/util/urlUtil';

class VocabularyTask extends React.PureComponent {

    render() {

        let { vocabularyList, taskStatus, playAction, param } = this.props;
        let testHref = addParam('/learn/wordquiz', param);
        const vocabularyItems = vocabularyList.map((item,index) => {
            let backgroundColor = '';
            if (index % 2 === 0) {
                backgroundColor = '#fff';
            } else {
                backgroundColor = '#f6fcff';
            }
            let style = {
                backgroundColor: backgroundColor,
            }
            return <VocabularyItem style={style} key={item.id} vocabulary={item} playAction={playAction}/>;
        });
        const test = taskStatus === '2' ? '再测一次' : '立即测试';

        return (
            <div className="vocabularyTask">
                <div className="v_Task_VocabularyHeader">
                    <a className="v_Task_H_TaskName">词汇学习</a>
                    <a className="v_Task_H_HistoryDoor" href="/learn/task?type=4">历史学习</a>
                </div>
                <div className="v_Task_VocabularyList">
                    {vocabularyItems}
                    <div className="v_Task_VocabularyFooter">
                        <div className="v_Task_VF_Container">
                            <a className="v_Task_F_Promote">别忘记了词汇测试，通过了测试才算完成当日测试任务哦！</a>
                            <a className="v_Task_F_TestDoor" href={testHref}>{test}</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default VocabularyTask;
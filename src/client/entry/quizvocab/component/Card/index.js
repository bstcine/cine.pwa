import React, { Component } from 'react';
import storeUtil from '@/util/storeUtil';
import * as Service from '@/service/quizvocab';
import { CSSTransition } from 'react-transition-group';
import { initWechat } from '@/util/wechatUtil';
import { getParam } from '@/util/urlUtil';
import CThemeProvider from '@/component/CThemeProvider';
import { CFlatButton, CDialog } from '@/component/_base';

export default class Card extends Component {
    constructor(props) {
        super(props);
        console.log('Card constructor');
        this.gotoWordCourse = this.gotoWordCourse.bind(this);
        this.param = getParam();
        this.state = {
            loading: true,
            uploading: false,
            wordItem: { id: '', word: '', options: [] },
            currMinVocab: 0,
            currMaxVocab: 0,
            isShowLevelTip: false,
            progressing: false,
            pressing: false,
            isWordEnd: false,
        };

        this.isTop10000 = this.param.estimate ? true : false;
        this.max_skip_right = 8;
        this.max_wrong = 3;
        this.last_index = 1;
        this.estimate_score = 0;
        this.disableClick = false;
        this.sandGlassTimer = null;
        this.levelTipTimer = null;
        this.duration = 15000;
        console.log(`Card this.props.token ${this.props.token}`);
        this.optionClick = this.optionClick.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount');
        Service.getWordList(this.param.estimate).then(result => {
            console.log(result);
            this.setState({
                loading: false
            });
            this.init(result.wordLevelList);
            this.config = result.config;
        });
    }

    componentDidMount() {
        console.log('componentDidMount');
        initWechat();
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    // 初始化
    init(wordLevelList) {
        // 答题开始时间
        this.begin_at = new Date().getTime();
        this.wordLevelList = wordLevelList;
        this.level_index = 0;
        this.word_index = 0;
        let wordLevel = this.wordLevelList[this.level_index];
        this.setState(
            {
                wordItem: Object.assign({}, wordLevel.wordList[0]),
                progressing: true
            },
            () => {
                this.toggleSandGlass();
            }
        );
    }

    stopTimer() {
        if (this.sandGlassTimer) clearTimeout(this.sandGlassTimer);
        if (this.levelTipTimer) clearTimeout(this.levelTipTimer);
    }

    // 下一个单词
    nextWord() {
        // 判断当前有没有跳出或结束
        console.log('准备下一个单词: ');
        let wordLevel = this.wordLevelList[this.level_index];
        if (this.word_index === wordLevel.wordList.length - 1) {
            console.log('本等级单词已完成, 开始下一个等级');
            return this.nextLevel();
        }
        if (this.isTop10000) {
            console.log('是从善恩核心词汇处过来的: ');
            let skipStatus = this.isSkipTop10000();
            if (skipStatus === -1) {
                return this.theEnd();
            } else if (skipStatus === 1) {
                return this.nextLevel();
            }
        } else {
            if (this.isSkipLevel()) {
                return this.nextLevel();
            }
        }
        this.disableClick = false;
        this.word_index++;
        this.setState(
            {
                wordItem: Object.assign({}, wordLevel.wordList[this.word_index]),
                progressing: true,
                pressing: !this.state.pressing
            },
            () => {
                this.toggleSandGlass();
            }
        );
    }
    isSkipTop10000() {
        let wordLevel = this.wordLevelList[this.level_index];
        let skipRight = 0;
        let wordWrong = 0;
        for (let i = 0; i < wordLevel.wordList.length; i++) {
            let item = wordLevel.wordList[i];
            if (item.select_value === 0) {
                skipRight++;
            } else if (!item.select_value) {
                console.log(`连续答对1: ${skipRight}, 答错: ${wordWrong}, selectValue:${item.select_value}`);
                return 0;
            } else {
                skipRight = 0;
                wordWrong++;
            }
            if (wordWrong >= this.max_wrong) {
                console.log(`连续答对2: ${skipRight}, 答错: ${wordWrong}`);
                return -1;
            } else if (skipRight >= this.max_skip_right) {
                console.log(`连续答对3: ${skipRight}, 答错: ${wordWrong}`);
                return 1;
            }
        }
        console.log(`连续答对4: ${skipRight}, 答错: ${wordWrong}`);
        return 0;
    }
    // 连续
    isSkipLevel() {
        let wordLevel = this.wordLevelList[this.level_index];
        let rightCount = 0;
        for (let i = 0; i < this.config.min_right_count && i < wordLevel.wordList.length; i++) {
            let item = wordLevel.wordList[i];
            if (item.select_value === 0) {
                rightCount++;
            }
        }
        console.log(`isSkipLevel ==> ${rightCount}`);
        return rightCount >= this.config.min_right_count;
    }

    //沙漏倒计时
    toggleSandGlass() {
        if (this.sandGlassTimer) clearTimeout(this.sandGlassTimer);
        this.sandGlassTimer = setTimeout(() => {
            this.saveOneAnswer(99);
            this.setState(
                {
                    progressing: false,
                    pressing: !this.state.pressing
                },
                () => {
                    setTimeout(() => {
                        this.nextWord();
                    }, 300);
                }
            );
        }, this.duration); //15秒自动跳转下一题
    }

    //下个词汇等级
    nextLevel() {
        console.log(`nextLevel --> level_index: ${this.level_index}`);
        //当 curr_level_score < 3 时，测试不进入下一等级，测试终止
        if (this.calcCurrLevelScore() < this.config.min_per_score) return this.theEnd();
        if (this.level_index === this.wordLevelList.length - 1) return this.theEnd();
        this.disableClick = false;
        this.showLevelTip();
        //下一级
        this.level_index++;
        this.word_index = 0;
        let wordLevel = this.wordLevelList[this.level_index];
        this.setState(
            {
                wordItem: Object.assign({}, wordLevel.wordList[0]),
                progressing: true
            },
            () => {
                this.toggleSandGlass();
            }
        );
    }

    showLevelTip() {
        let wordLevel = this.wordLevelList[this.level_index];
        this.setState({
            currMinVocab: wordLevel.min_vocab,
            currMaxVocab: wordLevel.max_vocab,
            isShowLevelTip: true
        });
        console.log(`isShowLevelTip ${this.state.isShowLevelTip}`);
        this.levelTipTimer = setTimeout(
            function() {
                this.setState({
                    isShowLevelTip: false
                });
            }.bind(this),
            3000
        );
    }

    // 前往top10000词汇阶段列表
    gotoWordCourse() {
        if (!this.param.estimate) {
            return;
        }
        let startIndex = 1;
        let range = 3000;
        if (this.last_index < 3000) {
            startIndex = 1;
            range = 3000;
        } else if (this.last_index < 6000) {
            startIndex = 3001;
            range = 3000;
        } else {
            startIndex = 6001;
            range = 4000;
        }
        Service.updateLastIndex(startIndex, range, this.last_index).then(result => {
            console.log(result);
            location.href = `/lword/course?last_index=${this.last_index}`;
        });
    }
    // 答题结束
    theEnd() {
        if (this.state.isWordEnd) {
            return;
        }
        this.disableClick = true;
        // 答题结束时间
        this.end_at = new Date().getTime();
        let user = storeUtil.get('user');
        let query = {
            grade: user.grade,
            born_at: user.born_at,
            area_code: user.area_code,
            vocab: this.calcCurrVocab(),
            answers: this.collectAnswers(),
            duration: this.getDuration()
        };
        if (this.props.token) query.token = this.props.token;
        this.setState({
            uploading: true
        });
        this.stopTimer();
        Service.saveContentWordResult(query).then(result => {
            if (result.except_case_desc) {
                return alert(result.except_case_desc);
            }
            this.setState({
                uploading: false
            });
            console.log(`result ${JSON.stringify(result)}`);
            if (this.param.estimate) {
                const estimateCom = this.param.estimate.split('-');
                const location = parseInt(estimateCom[0], 10);
                const range = parseInt(estimateCom[1], 10);
                let score = location + query.vocab;
                this.estimate_score = score / (location - 1 + range);
                console.log('本次评估得分: ' + this.estimate_score);
                if (this.estimate_score >= 0.9) {
                    if (range >= 9000) {
                        this.last_index = 9001;
                        this.estimate_score = 0.89;
                    } else {
                        this.last_index = location + range - 50;
                    }
                } else {
                    for (let i = 0; i < this.wordLevelList.length; i++) {
                        const wordLevel = this.wordLevelList[i];
                        if (wordLevel.min_vocab >= score) {
                            break;
                        }
                        this.last_index = wordLevel.min_vocab + 1;
                    }
                }

                this.setState({
                    isWordEnd: true,
                });
            } else {
                this.props.history.push(`/report?id=${result.result.statsContentWord.id}`);
            }
        });
    }

    // 保存单个单词的答题信息
    saveOneAnswer(select_value) {
        console.log(`select_value ${select_value}`);
        let word = this.wordLevelList[this.level_index].wordList[this.word_index];
        word.select_value = select_value;
        console.log(word.id, word.word, select_value, word.select_value);
    }

    // 收集全部答题信息
    collectAnswers() {
        let answers = [];
        this.wordLevelList.forEach(function(wordLevel) {
            wordLevel.wordList.forEach(function(item) {
                if (!isNaN(item.select_value)) {
                    answers.push({
                        id: item.id,
                        index: item.select_value
                    });
                }
            });
        });
        return answers;
    }

    // 耗时(秒)
    getDuration() {
        let duration = parseInt((this.end_at - this.begin_at) / 1000);
        console.log(`getDuration ${duration}`);
        return duration;
    }

    // 计算当前词汇等级得分
    calcCurrLevelScore() {
        let wordLevel = this.wordLevelList[this.level_index];
        let curr_score = 0;
        if (this.isSkipLevel()) {
            curr_score = this.config.per_count;
        } else {
            let right_count = 0;
            let wrong_count = 0;
            wordLevel.wordList.forEach(function(item) {
                if (item.select_value === 0) {
                    right_count++;
                } else {
                    wrong_count++;
                }
            });
            curr_score = right_count - wrong_count / 3;
            curr_score = curr_score >= 0 ? curr_score : 0;
        }
        wordLevel.curr_score = curr_score;
        console.log(`calcCurrLevelScore ${curr_score}`);
        return curr_score;
    }

    // 计算当前词汇量
    calcCurrVocab() {
        let curr_vocab = 0;
        this.wordLevelList.forEach(function(wordLevel) {
            if (wordLevel.curr_score) {
                curr_vocab += parseInt(
                    wordLevel.curr_score * (wordLevel.max_vocab - wordLevel.min_vocab) / wordLevel.wordList.length
                );
            }
        });
        console.log(`calcCurrVocab ${curr_vocab}`);
        return curr_vocab;
    }

    optionClick(select_value) {
        if (this.disableClick) return;
        this.disableClick = true;
        this.saveOneAnswer(select_value);
        // 按钮&进度条动画延迟
        this.setState(
            {
                progressing: false,
                pressing: true
            },
            () => {
                setTimeout(() => {
                    this.nextWord();
                }, 300);
            }
        );
    }

    renderOptions() {
        let options = this.state.wordItem.options;
        for (let i = 0; i < this.state.wordItem.options.length; i++) {
            if (this.state.wordItem.options[i].isCorrect) {
                console.log('正确答案: ', this.state.wordItem, this.state.wordItem.options[i].zh);
            }
        }
        let Options = options.map((option, i) => {
            return (
                <button
                    key={this.state.wordItem.id + i}
                    className="btn btn_option"
                    onClick={e => this.optionClick(option.value, e)}
                >
                    {option.zh}
                </button>
            );
        });
        Options.push(
            <button
                key={this.state.wordItem.id + 99}
                className="btn btn_option btn_no_remember"
                onClick={e => this.optionClick(99, e)}
            >
                不认识
            </button>
        );
        return Options;
    }

    render() {
        let { loading, uploading } = this.state;
        if (loading) {
            return (
                <div className="card">
                    <div className="loading">词汇加载中...</div>
                </div>
            );
        }
        if (uploading) {
            return (
                <div className="card">
                    <div className="uploading">正在计算排名...</div>
                </div>
            );
        }
        const dialogActions = [
            <CFlatButton
                key="WordEnd"
                label="确定"
                primary={true}
                onClick={this.gotoWordCourse}
            />,
        ];
        const estimateText = `测试完成, 建议从第${this.last_index}个单词开始学习`;
        return (
            <CThemeProvider>
                <React.Fragment>
                    <div className="card">
                        <CSSTransition
                            in={this.state.isShowLevelTip}
                            classNames="fade"
                            appear={true}
                            enter={true}
                            exit={true}
                            timeout={{enter: 2700, exit: 300}}
                        >
                            <div className="friendly-tips">
                                你已经完成了{this.state.currMinVocab}-{this.state.currMaxVocab}词汇量区间的测试
                            </div>
                        </CSSTransition>
                        <div className="word" key={this.state.wordItem.id + 'word'}>
                            {this.state.wordItem.word}
                        </div>
                        <div className="progress_control" key={this.state.wordItem.id + 'progress_control'}>
                            <div className="sand-glass" />
                            <div className="progress-line">
                                <CSSTransition
                                    in={this.state.progressing}
                                    classNames="progressing"
                                    appear={true}
                                    enter={true}
                                    exit={false}
                                    timeout={this.duration}
                                >
                                    <div className="progress-line-left" />
                                </CSSTransition>
                            </div>
                        </div>
                        <div className="options" key={this.state.wordItem.id + 'options'}>
                            {this.renderOptions()}
                        </div>
                    </div>
                    <CDialog
                        title={estimateText}
                        modal={false}
                        actions={dialogActions}
                        open={this.state.isWordEnd}
                        onRequestClose={this.gotoWordCourse}
                    />
                </React.Fragment>
            </CThemeProvider>
        );
    }
}

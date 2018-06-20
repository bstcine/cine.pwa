/**
 * 当前试卷的状态
 * 该状态与测验报告(stats_quiz)表中的状态有所区别，本状态与当前登录角色有一定关系
 */
export const CurrentQuizState = {
    /**
     * 答题中
     */
    ANSWERING: 'ANSWERING',

    /**
     * 等待批改中
     */
    WAITING4CHECK: 'WAITING4CHECK',

    /**
     * 批改中
     */
    CHECKING: 'CHECKING',

    /**
     * 检阅中
     */
    REVIEWING: 'REVIEWING',
};

/**
 * 用户角色
 */
export const RoleID = {
    /**
     * 1：管理员
     */
    ADMINISTRATOR: '1',

    /**
     * 2：老师
     */
    TEACHER: '2',

    /**
     * 3：学生
     */
    STUDENT: '3',

    /**
     * 4：代理商
     */
    AGENT: '4',
};

/**
 * 测验报告状态
 */
export const StatsContentQuizStatus = {
    /**
     * 0:答题中
     */
    ANSWERING: '0',
    /**
     * 1:待批改
     */
    WAITING4CHECK: '1',
    /**
     * 2:批改中
     */
    CHECKING: '2',
    /**
     * 3:已批改
     */
    CHECKED: '3',
};

/**
 * 试卷题型
 */
export const QuestionFormat = {
    /**
     * 1:单选题
     */
    FORMAT1_CHOOSE_ONE: 1,

    /**
     * 2:多选题
     */
    FORMAT2_CHOOSE_MULTI: 2,

    /**
     * 3:句子改错
     */
    FORMAT3_CORRECT: 3,

    /**
     * 10:描述文本(富文本)
     */
    FORMAT10_COMMON_DESC: 10,

    /**
     * 11:阅读理解描述文本(富文本)
     */
    FORMAT11_READING_DESC: 11,

    /**
     * 13:简答题
     */
    FORMAT4_SHORT_QUE: '4',
};

/**
 * 任务类型
 */
export const Task_Type = {
    /**
     * 1:视频
     */
    Video: '1',
    /**
     * 2:习题
     */
    Quiz: '2',
    /**
     * 3:习题反馈
     */
    Quiz_Feedback: '3',
    /**
     * 4:单词
     */
    Word: '4',
};

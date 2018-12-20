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
 * 学生作业类型
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
    /**
     * 5:习题pdf格式
     */
    Quiz_PDF: '5',
    /**
     * 6:作文
     */
    Writing: '6',
    /**
     * 7:线下单词
     */
    OfflineWord: '7',
    /**
     * 8:线下
     */
    Offline: '8',
};

export const Learn_Word_Correct_SleepTime = 1;
export const Learn_Word_Failed_SleepTime = 5;

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
};

export const SITECODE = {
    IOS: 'cine.ios',
    IOS_IPHONE: 'cine.ios.iphone',
    IOS_IPAD: 'cine.ios.ipad',
    ANDROID: 'cine.android',
    ANDROID_PHONE: 'cine.android.phone',
    ANDROID_PAD: 'cine.android.pad',
    WEB_WECHAT: 'cine.web.wechat',
    WEB_PC: 'cine.web.pc',
    WEB_IPHONE: 'cine.web.iphone',
    WEB_IPAD: 'cine.web.ipad',
    WEB_ANDROID_PHONE: 'cine.web.android.phone',
    WEB_ANDROID_PAD: 'cine.web.android.pad',
    WEB_OTHER: 'cine.web.other',
};

export const LEARN_TEST_CORRECT_SELLP = 5;
export const LEARN_TEST_WRONG_SELLP = 1;
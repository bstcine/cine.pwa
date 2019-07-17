exports.APIURL_Content_Word_Config = '/api/content/word/config'; // 词汇量测验开始前，读取配置 & 用户年级
exports.APIURL_Content_Word_List = '/api/content/word/list'; // 词汇量测验开始，获取单词列表 & 年级词汇量区间
exports.APIURL_Content_Word_Result_Save = '/api/content/word/result/save'; // 词汇量测验结束，保存答题记录
exports.APIURL_Content_Word_Result_Query = '/api/content/word/result/query'; // 查看词汇量测验的报告 & 推荐课程
exports.APIURL_Content_Word_Result_List = '/api/content/word/result/list'; // 查看词汇量测验列表
exports.APIURL_Content_Course_Comment = '/api/content/course/comment'; // 课程评论
exports.APIURL_Create_Coupon = '/api/web/createCoupon'; // 创建优惠券
exports.APIURL_Order_PreCalculatePrice = '/api/order/preCalculatePrice'; // 订单预计算
exports.APIURL_Order_Prepare = '/api/order/prepare'; // 预先准备订单
exports.APIURL_Order_Create = '/api/order/create'; // 创建订单
exports.APIURL_User_Order_List = '/api/user/order/list'; // 订单列表
exports.APIURL_Order_Detail = '/api/order/detail'; // 订单详情
exports.APIURL_Order_Pay_Status = '/api/order/pay/status'; // 获取支付状态

exports.APIURL_Pay_Wechat_App = '/api/pay/wechat'; // 微信app支付
exports.APIURL_Pay_Wechat_Qrcode = '/api/pay/wechat/QRcode'; // 微信QRcode支付
exports.APIURL_Pay_Wechat_Jsapi = '/api/pay/wechat/jsapi'; // 微信jsapi支付
exports.APIURL_Pay_Wechat_Notify = '/api/pay/wechat/notify/:wechat_trade_type'; // 微信支付 [回调]
exports.APIURL_Pay_Wechat_Mweb = '/pay/wechat/mweb'; // 微信mweb支付 页面路由。非标准2.0接口
exports.APIURL_Pay_Ali_App = '/api/pay/ali'; // 支付宝app支付
exports.APIURL_Pay_Ali_Pc = '/pay/ali/pc'; // 支付宝pc支付 页面路由。非标准2.0接口
exports.APIURL_Pay_Ali_Mweb = '/pay/ali/mweb'; // 支付宝mweb支付 页面路由。非标准2.0接口
exports.APIURL_Pay_Stripe_Info = '/api/pay/stripe/info'; // 查询 stripe 初始化参数
exports.APIURL_Pay_Stripe = '/api/pay/stripe'; // stripe 支付

exports.APIURL_Content_Home = '/api/content/home'; // app首页
exports.APIURL_Content_Tag_Tree = '/api/content/tag/tree'; // 标签树
exports.APIURL_Content_Course_Detail = '/api/content/course/detail'; // 课程详情
exports.APIURL_Content_Course_Set = '/api/content/course/set'; // 课程详情
exports.APIURL_Content_Lesson_Detail = '/api/content/lesson/detail'; // 课内容
exports.APIURL_Content_SubPage = '/api/content/subpage';// 二级页面
exports.APIURL_User_Content_Course_Mylist = '/api/user/content/course/list'; // 我的学习列表
exports.APIURL_User_Content_Task_Current = '/api/user/content/task/current'; // 我的本周作业
exports.APIURL_Content_Task_Share = '/api/content/task/share'; // 私塾分享
exports.APIURL_Content_Chapter_List = '/api/content/chapter/list'; // 课程目录
exports.APIURL_Content_Chapter_ListWithMedia =
    '/api/content/chapter/listWithMedia'; // 课程目录包含media
exports.APIURL_User_Content_Course_UpdateStatus =
    '/api/user/content/course/updateLearnStatus'; // 更新学习进度
exports.APIURL_Content_Lesson_Quiz = '/api/web/quiz/'; // 小节测试
exports.APIURL_Content_StuQuizWord_List = '/api/content/stuQuizWord/list'; // 获取学生、核心语法测试、词汇测试列表，根据管理员或老师
exports.APIURL_Content_School_Detail = '/api/content/school/detail'; // 学校详情


exports.APIURL_STATS_ACTIVITY_COURSE_INFO = '/api/stats/activity/course/info'; // 课程活动参与用户纪录信息
exports.APIURL_STATS_ACTIVITY_COURSE_UPDATE = '/api/stats/activity/course/update'; // 更新课程活动参与用户纪录

exports.APIURL_Mentor_Student_ListWithTask = '/api/mentor/student/listWithTask'; // 老师/管理员获取所有学生的本周作业列表
exports.APIURL_Content_Task_Update_Status = '/api/content/task/update/status'; // 导师更新任务状态

exports.APIURL_Content_Quiz = '/api/content/quiz'; // 阅读理解题目数据 & 答题记录请求
exports.APIURL_Stats_Quiz_Save = '/api/stats/quiz/save'; // 保存阅读理解测试答案
exports.APIURL_Stats_Quiz_Update = '/api/stats/quiz/update'; // 更新阅读理解测试批改结果
exports.APIURL_Stats_Quiz_Reset = '/api/stats/quiz/reset'; //  重置阅读理解测试（学生重做）
exports.APIURL_Stats_Quiz_List = '/api/stats/quiz/list'; // 阅读理解测试学生答题列表

exports.APIURL_Wechat_Js_Signature = '/api/wechat/jssignature';

exports.APIURL_Web_Share_Log = '/api/web/sharelog'; // 查询通用分享
exports.APIURL_Share_Common = '/api/share/common'; // 创建通用分享
exports.APIURL_Share_Update = '/api/web/updatesharelog'; // 更新分享状态
exports.APIURL_Share_CoursePackage = '/api/share/coursePackage'; // 课程详情分享(购买后订单分享)

exports.APIURL_User_Coupon = '/api/user/coupon/list'; // 查询优惠券
exports.APIURL_User_Coupon_Add = '/api/user/coupon/add'; // 添加优惠券
exports.APIURL_User_Coupon_Transfer = '/api/user/coupon/transfer'; // 转移用户优惠券
exports.APIURL_User_Point = '/api/user/integral/list'; // 查询积分
exports.APIURL_User_Query = '/api/user/query'; // 查询用户是否存在
exports.APIURL_User_Info = '/api/user/info'; // 用户信息
exports.APIURL_User_Quiz_Stats = '/api/user/quiz/stats'; // 用户测试历史
exports.APIURL_User_Address_Add = '/api/user/address/add'; // 新增收货地址
exports.APIURL_User_Address = '/api/user/address'; // 查询收货地址
exports.APIURL_User_Social_List = '/api/user/social/list'; // 社交账号列表
exports.APIURL_Global_Integral_Rule = '/api/global/integral/rule'; // 积分规则

exports.APIURL_LogoutV1 = '/api/web/logout'; // 登出

exports.APIURL_Auth_SignIn = '/api/auth/signin'; // 登录
exports.APIURL_Auth_SignUp = '/api/auth/signup'; // 注册
exports.APIURL_Auth_Send_AuthCode = '/api/auth/send/authCode'; // 发送绑定手机验证码
exports.APIURL_Auth_Bind_Phone = '/api/auth/bind/phone'; // 绑定手机（自动注册）
exports.APIURL_Auth_Confirm = '/api/auth/confirm'; // 确认登录
exports.APIURL_Auth_Auto_Signin = '/api/auth/auto/signin'; // 自动登录
exports.APIURL_Auth_Send_VerificationCode = '/api/auth/send/verificationCode'; // 发送验证码(手机 邮箱)
exports.APIURL_Auth_Reset_Password = '/api/auth/reset/password'; // 重置密码(手机 邮箱)
exports.APIURL_Auth_Set_Password = '/api/auth/set/password'; // 设置密码
exports.APIURL_Auth_Reset_Phone = '/api/auth/reset/phone'; // 老用户绑定手机
exports.APIURL_Auth_Social_Unbind = '/api/auth/social/unbind'; // 解绑社交账号
exports.APIURL_Auth_Social_Bind = '/api/auth/social/bind'; // 绑定社交账号

exports.APIURL_System_AccessLog_Create = '/api/system/accesslog/create'; // 创建访问日志

exports.APIURL_Temp_User_Course_Coupon = '/api/temp/user/course/coupon'; // 获取用户将永久转为限时课程可以获得的优惠券
exports.APIURL_Temp_User_Course_Coupon_Check =
    '/api/temp/user/course/coupon/check'; // 将永久课程转为限时课程，并赠送优惠券
exports.APIURL_Temp_User_Coupon_Receive = '/api/temp/user/coupon/receive'; // 用户领取活动优惠券
exports.APIURL_Temp_User_Exp_Course = '/api/temp/user/exp/course'; // 根据手机号注册开通体验课程
exports.APIURL_Admin_Coupon_Synthesizer = '/api/admin/user/coupon/synthesizer'; // 管理员将某用户的通用、直减、未使用的优惠券执行合并
exports.APIURL_Admin_User_Coupon_List = '/api/admin/user/coupon/list'; // 管理员获取某用户的未使用优惠券列表

exports.APIURL_User_Learn_Word = '/api/user/learn/word'; // 词汇任务单词列表
exports.APIURL_User_Learn_Task = '/api/user/learn/task'; // 历史任务列表
exports.APIURL_User_Learn_UpdateTaskStatus = '/api/user/learn/updatetask'; // 更新任务状态

exports.APIURL_User_Learn_SaveFailure = '/api/user/learn/savefailure'; // 保存选择错误的信息
exports.APIURL_User_Content_Word_UpdateKnow =
    '/api/user/content/word/updateknow'; // 保存已认识单词

exports.APIURL_Content_Quiz_Word_List = '/api/content/quiz/word/list'; // 词汇量测试开始，获取top10000单词列表

exports.APIURL_User_Word = '/api/user/word'; // 获取用户词汇测试得分
exports.APIURL_User_Word_Update = '/api/user/word/update'; // 更新用户词汇测试得分

exports.APIURL_User_Word_Lesson_Learn_Update =
    '/api/user/word/lesson/learn/update'; // 更新用户课程词汇测试最新点击选项

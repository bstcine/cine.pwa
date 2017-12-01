const api_host = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.1.194:9000';

exports.APIURL_Content_Word_Config = api_host + "/api/content/word/config" //词汇量测验开始前，读取配置 & 用户年级
exports.APIURL_Content_Word_List = api_host + "/api/content/word/list" //词汇量测验开始，获取单词列表 & 年级词汇量区间
exports.APIURL_Content_Word_Result_Save = api_host + "/api/content/word/result/save" //词汇量测验结束，保存答题记录
exports.APIURL_Content_Word_Result_Query = api_host + "/api/content/word/result/query" //查看词汇量测验的报告 & 推荐课程
# cine.pwa
web app

### Example

#### 1. 修改详情页其中一个 TAB 名称，如"详情"-->"详情2"

1. 根据页面路由 `/content/course` 找到 `src/client/entry/content/index.js` 入口文件

2. 根据入口文件，确定 `Course` component 组件路径 `src/client/entry/content/component/Course/index.js`，找到 TabItem 组件，修改"详情"-->"详情2"

3. 运行 `run prod-build`，构建完成后，清空 cine.web/webapp 目录，将 build 文件夹下的所有文件粘贴到 cine.web/webapp 目录下，commit & push

4. 登录服务器进行部署(see at)[https://github.com/bstcine/help/wiki/Server-%E9%83%A8%E7%BD%B2%E4%B8%8E%E9%85%8D%E7%BD%AE]


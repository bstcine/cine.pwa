### Example

#### 修改详情页其中一个 TAB 名称，如"详情"-->"详情2"

##### Step 1 Install

1. Terminal 中运行如下命令
	```shell
	    $ git clone https://github.com/bstcine/cine.pwa.git
	    $ cd cine.pwa
	    $ cnpm install
	```

##### Modify

1. 根据页面路由 `/content/course` 找到 `src/client/entry/content/index.js` 入口文件

2. 根据入口文件，确定 `Course` component 组件路径 `src/client/entry/content/component/Course/index.js`，找到 TabItem 组件，修改"详情"-->"详情2"


##### Step 2 Develop Test

1. Terminal 中运行如下命令

    ```shell
    $ npm run dev-dll
    $ npm run start
    ```
2. 浏览器打开 `http://localhost:5000/content/course?cid=d011516184489344HHgJNDQDez` 验证是否修改成功


##### Step 3 Production Release

1. Terminal 中运行如下命令

    ```shell
    $ npm run prod-dll
    $ npm run prod-build
    ```

2. 清空 `cine.web/webapp` 目录，将 build 文件夹下的所有文件粘贴到 `cine.web/webapp` 目录下，git commit & push

3. 登录服务器进行部署 [See at](https://github.com/bstcine/help/wiki/Server-%E9%83%A8%E7%BD%B2%E4%B8%8E%E9%85%8D%E7%BD%AE)


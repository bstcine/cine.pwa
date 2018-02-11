### 修改详情页其中一个 TAB 名称，如"详情"-->"详情2"

#### Step 1. Install

1. Terminal 中运行如下命令

	```shell
	$ mkdir -p work/project && cd work/project
	$ git clone https://gitee.com/bstcine/cine.web.git
	$ git clone https://github.com/bstcine/cine.pwa.git
	$ cd cine.pwa
	$ cnpm install
	```

#### Step 2. Modify

1. 根据页面路由 `/content/course` 找到 `src/client/entry/content/index.js` 入口文件

2. 根据入口文件，确定 `Course` component 组件路径 `src/client/entry/content/component/Course/index.js`，找到 TabItem 组件，修改"详情"-->"详情2"


#### Step 3. Develop Mode

1. 构建开发模式

    ```shell
    $ npm run dev-dll
    $ npm run start
    ```

2. 浏览器打开 `http://localhost:5000/content/course?cid=d011516184489344HHgJNDQDez` 验证是否修改成功

#### Step 4. Static Mode

1. 修改 `config.js`，Line 3 ~ 9

    ```git
    // 本地静态文件模式 begin
    const MODE = 'static';
    const API_Host_URL = 'http://apptest.bstcine.com';
    // 本地静态文件模式 end 
       
    // const MODE = '';
    // const API_Host_URL = '';
    ```
2. 选择开发构建 `$ npm run dev-dll && npm run dev-build` 或生产构建 `$ npm run prod-dll && npm run prod-build`

3. 浏览器打开 `build/entry/content/index.html` 并在 url 上添加 `#/content/course?cid=d011516184489344HHgJNDQDez`
    > file:///Users/cine/work/project/cine.pwa/build/entry/content/index.html#/content/course?cid=d011516184489344HHgJNDQDez

#### Step 5. Production Mode

1. 构建生产模式

    ```shell
    $ npm run prod-dll && npm run prod-build
    ```

2. 更新 cine.web 主项目

    ```shell
    $ rm -rf ../cine.web/webapp/*
    $ cd ../cine.web/webapp/
    $ cp -R ../../cine.pwa/build/* .
    $ git add *
    $ git commint -m 'update react h5'
    $ git push
    ```

3. 部署服务器

    ```shell
    $ ssh ******@bstcine.com
    $ ******
    ```		
	> 输入密码 `******` 

	```shell
	$ /mnt/web/deploy.bstcine.com/wwwroot/cmd/git-check-restart-test.sh
	```

4. 浏览器打开 `http://apptest.bstcine.com/content/course?cid=d011516184489344HHgJNDQDez` 验证是否修改成功	

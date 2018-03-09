### 部署&开发

### Step 1. Install

1. Terminal 中运行如下命令

	```shell
	$ git clone https://github.com/bstcine/cine.pwa.git
	$ cd cine.pwa
	$ cnpm install

	```

<br>
<br>

### Step 2. Modify

1. 根据页面路由 `/content/course` 找到 `src/client/entry/content/index.js` 入口文件

2. 根据入口文件，确定 `Course` component 组件路径 `src/client/entry/content/component/Course/index.js`，找到 TabItem 组件，修改"详情"-->"详情2"

<br>
<br>

### Step 3. Build & Run
- 把通用third-party packages 生成一个vendor.js
    ```shell

    $ npm run prod-dll


    备注：- build/dll/dll.99977741.js
    ```

<br>

- #### 3.1. 构建开发模式
```shell
Step1:   $ npm run start
Step2:   浏览器打开 `http://localhost:5000/`
```

- #### 3.2. Static Mode
```shell
Step1:  修改 `webpack.config.js`，Line 4
            const MODE = 'static';

Step2.  运行 `$ npm run dev-build`

Step3.  直接打开 `build/entry/content/index.html`， 在网页中直接某课程
```

- #### 3.3. Production Mode - 生产模式

1. For PC
```shell
Step1:  修改 `webpack.config.js`，Line 4
            const MODE = '';

Step2.  运行 `$ npm run prod-build`
```

2. For iPad
```shell
Step1:  修改 `webpack.config.js`，Line 4~5
            const MODE = 'static';
            const API_Dev_URL = 'http://www.bstcine.com';

Step2.  运行 `$ npm run prod-build`
```

<br>
<br>

## 项目遗留问题
- 不同的Build模式，需要修改不同的config.配置，有点麻烦
```
目前情况：需要修改*.config.*.js的配置
目标：不同的Build模式，只需要运行不同的scripts
```
- Static模式，用户无法登入成功
```
原因：Static模式，服务器触发保存Browser的Coockie， 但无法保存成功
目标：可以正常使用登入功能
```

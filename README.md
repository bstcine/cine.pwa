### 部署&开发

### Step 1. Install

_请统一使用 cnpm 下载安装依赖_，cnpm 和 npm 打出来的包 hash 不一致，造成缓存失效

_请勿在未测试下随意更新 npm 包，例如：webpack 4.12.0 有 bug，会导致打包出错_

1.  Terminal 中运行如下命令

    ```shell
    $ git clone https://github.com/bstcine/cine.pwa.git
    $ cd cine.pwa
    $ cnpm install
    ```

<br>
<br>

### Step 2. Modify

1.  根据页面路由 `/content/course` 找到 `src/client/entry/content/index.js` 入口文件

2.  根据入口文件，确定 `Course` component 组件路径 `src/client/entry/content/component/Course/index.js`，找到 TabItem 组件，修改"详情"-->"详情 2"

<br>
<br>

### Step 3. Build & Run

*   把通用 third-party packages 生成一个 vendor.js

    ```shell
    $ npm run prod-dll
    ```


    备注：- build/dll/dll.99977741.js
    ```

<br>

*   #### 3.1. 构建开发模式

```shell
Step1:   $ npm run start
Step2:   浏览器打开 `http://localhost:5000/`
```

*   #### 3.2. Static Mode

```shell
Step1:  修改 `webpack.config.js`，Line 4
            const MODE = 'static';

Step2.  运行 `$ npm run dev-build`

Step3.  直接打开 `build/entry/content/index.html`， 在网页中直接某课程
```

*   #### 3.3. Production Mode - 生产模式

1.  For PC

```shell
Step1:  修改 `webpack.config.js`，Line 4
            const MODE = '';

Step2.  运行 `$ npm run prod-build`
```

2.  For iPad

```shell
Step1:  修改 `webpack.config.js`，Line 4~5
            const MODE = 'static';
            const API_Host_URL = 'http://www.bstcine.com';

Step2.  运行 `$ npm run prod-build`
```

<br>
<br>

## 项目遗留问题

*   1, 不同的 Build 模式，需要修改不同的 config.配置，有点麻烦

```
目前情况：需要修改*.config.*.js的配置
目标：不同的Build模式，只需要运行不同的scripts
```

*   2, Static 模式，用户无法登入成功

```
原因：Static模式，服务器触发保存Browser的Coockie， 但无法保存成功
目标：可以正常使用登入功能
```

*   3, Static 模式，课程详情页-产品概要的链接异常

```
目前情况：iPad使用预先加载本地JS，点击“课程详情页-产品概要”链接，显示空白
目标：iPad可以正常使用
```

<br>
<br>

## 代码规范 （Redux）

*   ActionType 定义路径

```
src/client/constant/actionType.js
目的：可以清晰的看到某个模块某个页面对应actionType
```

<br>

*   Action

```
代码路径:
src/client/action/userAction.js

命名规范:
userAction: entry的User模块
uCouponAction: entry的User模块对应的Coupon page
- 如果代码比较多，某个page的Action也可单独写一个js文件


dispatch格式规范:
{
  type: ActionType定义的,   //与reducer需要的ActionType有1：1的对应关系
  payload: 需要传递的数据
}


目的：可以清晰的看到某个页面对应action
```

<br>

*   Container

```
代码路径1:
src/client/entry/page/**Container.js

代码路径2:
src/client/entry/page/container/****.js

对象命名规范:
***Cont
***Container
```

<br>

*   component

```
  - 尽量使用Pure Function or PureComponent
  - 尽量不要写额外的Action，触发的Action来源于this.props.action
    Action代码应该都在：src/client/action/***Action.js

  - 不要写Container
```

*   reducer

```
  - 建议使用 immutable
```

<br>
<br>

## 命名规范

*   \_****\*\***** //基本满足业内通用的标准
*   C****\*\***** //所有的项目都能使用
*   G****\*\***** //Cine.PWA 项目 全局最通过的部分

```
创建以上文件需要沟通确认的
```

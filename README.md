# PONY共创视觉方向稿

基于 React + Vite 的四页面前端视觉草稿，聚焦页面结构、内容层级和统一视觉语言，不属于业务 MVP。

在线预览：https://erratyi.github.io/ponydao-demo/

## 运行

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 3300
```

## 页面

- `#home`：类似 OPCMatch 官网职责的平台介绍首页
- `#hall`：面向产品与项目的共创大厅
- `#dao`：展示产品、项目、成员和规则的 DAO 公开页
- `#profile`：当前 OPC 的参与、贡献与收益概览

## 视觉稿内的必要状态

- 全局页面切换与移动端折叠菜单
- 共创大厅搜索与对象/能力筛选
- DAO 公开页分区标签
- 个人中心分区选中状态
- 轻量操作反馈

## 验证

```bash
npm run build
npm run test:sites
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布 GitHub Pages。

本稿仅用于产品方向讨论，后端、真实登录、数据保存和资金能力均未接入。

# PonyDAO 前端视觉方向稿

PonyDAO 是一个面向 OPC 的开放式 DAO 协作平台。本仓库当前发布的是用于讨论产品方向和交互结构的前端视觉稿，不连接后端。

在线预览：https://erratyi.github.io/ponydao-demo/

视觉稿包含四组可切换画面：

- DAO 市场：公开发现 DAO、产品与项目。
- DAO 公开页：查看使命、开放机会、成员、规则、治理和金库透明度。
- My Hub：汇总个人协作、待办、贡献和收益。
- 移动端：验证公开发现与个人协作在手机上的信息优先级。

## 本地预览

```bash
python3 -m http.server 3300 --directory site
```

打开 http://127.0.0.1:3300/ ，顶部可以切换四组画面，也可直接访问 `#market`、`#dao`、`#hub` 和 `#mobile`。

## 原生静态服务器
> 支持cli快速初始化

```bash
Usage: cli [options]


    默认主机:127.0.0.1
    默认端口:2714
    默认路径:./


Options:
  -V, --version            output the version number
  -H, --host <IP>          Host Address
  -P, --port <Number>      Port Number
  -F, --filepath <String>  FilePath Address
  -h, --help               display help for command
  ```

**相关技术**

- PNPM包管理
- 匹配MIME
- 嵌套解析
- Gzip传输
- 缓存持久化
- chalk.js
- commander.js

**初衷**

针对nodejs的原生`path`、`fs`等模块专项训练


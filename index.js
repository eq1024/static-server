import http from 'http';
import chalk from 'chalk';
import path from 'path';
import { router } from './util/router.js'

const defaul_config = {
  host: '127.0.0.1',
  port: 2714,
  pst: path.resolve(),
}

export class Server {
  constructor(config) {
    this.conf = Object.assign({}, defaul_config, config)
  }
  start() {
    const app = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url);//解码中文和空格
      const __dirname = this.conf.pst
      const queryurl = path.join(__dirname, url)
      router(queryurl, res, req)
    })

    app.listen(this.conf.port, this.conf.host, () => {
      let msg = `服务器启动在 http://${this.conf.host}:${this.conf.port}`
      console.log(chalk.bold.blue.bgWhite(msg));
    })
  }
}


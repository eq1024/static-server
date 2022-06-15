import { program } from 'commander'
import { Server } from '../index.js'

program
    .version('1.0.0')
    .description(`
    默认主机:127.0.0.1
    默认端口:2714
    默认路径:./
    `)
    .option('-H, --host <IP>', 'Host Address')
    .option('-P, --port <Number>', 'Port Number')
    .option('-F, --filepath <String>', 'FilePath Address')
    .parse(process.argv)
const argv = program.opts()

const config = {}
argv.host ? config.host = argv.host : null
argv.port ? config.port = argv.port : null
argv.filepath ? config.pst = argv.filepath : null
const server = new Server(config)
server.start()


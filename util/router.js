import fs from 'fs'
import path from 'path';
import { promisify } from 'util';
import { getDom } from './getDom.js'
import { getGzip } from './compress.js'
import { range } from './getRange.js'
import { usecache } from './cache.js'
import mime from 'mime'
const _stat = promisify(fs.stat)
const _readdir = promisify(fs.readdir)


export async function router(queryurl, res, req) {
  try {
    const filestat = await _stat(queryurl)
    if (filestat.isFile()) {
      res.setHeader('Content-Type', mime.getType(path.extname(queryurl).split('.').pop()) + ';charset=utf-8');
      if (usecache(filestat, res, req)) {
        res.statusCode = 304;
        res.end()
        return
      }
      let streamfile
      const { start, end } = range(filestat.size, res, req);
      if ((start || start === 0) && end) {
        streamfile = fs.createReadStream(queryurl, { start: start, end: end })
      } else {
        streamfile = fs.createReadStream(queryurl)
      }
      getGzip(streamfile, res, req).pipe(res)
    }
    if (filestat.isDirectory()) {
      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      let dirs = await _readdir(queryurl)
      let relative = path.relative(path.resolve(), queryurl)
      let domlist = dirs.map((item) => {
        return getDom(relative, item)
      })
      res.end(domlist.join(''))
    }
  } catch (err) {
    res.end(JSON.stringify(err))
  }
} 
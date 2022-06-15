import {createGzip} from 'zlib'

export function getGzip(file,res,req){
    res.setHeader('Content-Encoding','gzip')
    return file.pipe(createGzip())
}
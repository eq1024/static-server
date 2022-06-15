export function range(total, res, req) {
    const range = req.headers['range']
    if (!range) {
        return {start:false,end:false}
    }
    const size = range.match(/bytes=(\d*)-(\d*)/)
    const end = size[2] || total - 1
    const start = size[1] || total - end
    if(start > end || start<0 || end > size){
        return {start:false,end:false}
    }
    res.setHeader('zz','kk')
    res.setHeader('Accept-Ranges','bytes');
    res.setHeader('Content-Range',`bytes ${start}-${end}/${total}`)
    res.setHeader('Content-Length',end - start)  //这里会自动进行转换,不需要像下面操作
    return {
        start : parseInt(start),
        end: parseInt(end),

    }
}
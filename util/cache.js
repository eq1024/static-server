function isfresh(filestats, res) {
    res.setHeader('Cache-Control', `public,max-age=${600}`)
    res.setHeader('Last-Modified', filestats.mtime.toUTCString())
}

export function usecache(filestats, res, req) {
    isfresh(filestats, res)
    const ModifiedSince = req.headers['if-modified-since'];
    if (ModifiedSince && ModifiedSince == filestats.mtime.toUTCString()){
        return true
    }else{
        return false
    }
}
export function getDom(relative, src) {

    let link = `${relative}/${src}`
    link = link.split('\\').join('/').split('/');
    link = link.length >= 3 ? link.slice(-2).join('/') : link.length == 2 ? link.join('/') : null
    return `<div><a href="${link}">${src}</a></div>`
}
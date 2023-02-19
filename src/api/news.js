import createAxios from "@/utils/request.js"

const api = {
    newlist:'/api/index/news',
    detal:'/api/index/detail',
    add:'/api/author/article',
    comment:'/api/comment/get',
    deleteCom:'/api/comment/del',
    addCom:'/api/comment/add',
    star:'/api/reader/collect',
}

export function getNews()
{
    return createAxios({
        url:api.newlist,
        method:'get',
    })
}

export function getDetail(id)
{
    return createAxios({
        url:api.detal,
        method:'get',
        params:{
            id
        }
    })
}

export function addNews(token,news,imgUrl){
    return createAxios({
        url:api.add,
        method:'post',
        headers:{
            'token':token
        },
        data:{
            title:news.title,
            introduce:news.introduce,
            picture:imgUrl,
            content:news.content,
            tag:news.tag,
            level:news.level
        }
    })
}

export function getComment(articleId){
    return createAxios({
        url:api.comment,
        method:'get',
        params:{
            articleId
        }
    })
}

export function star(token,id)
{
    return createAxios({
        url:api.star,
        method:'post',
        headers:{
            'token':token
        },
        data:{
            id
        }
    })
}

export function cancelStar(token,id)
{
    return createAxios({
        url:api.star,
        method:'delete',
        headers:{
            'token':token
        },
        params:{
            id
        }
    })
}

export function getStar(token)
{
    return createAxios({
        url:api.star,
        method:'get',
        headers:{
            'token':token
        },
    })
}

export function deleteComm(token,id)
{
    return createAxios({
        url:api.deleteCom,
        method:'delete',
        headers:{
            'token':token
        },
        params:{
            id
        }
    })
}

export function addCom(token,content,articleId,readerId,parentId)
{   
    return createAxios({
        url:api.addCom,
        method:'post',
        headers:{
            'token':token
        },
        data:{
            content,
            articleId,
            readerId,
            parentId
        }
    })
}
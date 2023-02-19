import createAxios from "@/utils/request.js"

const api = {
    get:'/api/admin/authors',
    add:'/api/admin/create'
}

export function getUser(token)
{
    return createAxios({
        url:api.get,
        method:'get',
        headers:{
            'token':token
        }
    })
}

export function addUser(token,addForm)
{
    return createAxios({
        url:api.add,
        method:'post',
        headers:{
            'token':token
        },
        data:{
            username:addForm.username,
            password:addForm.password,
            nickName:addForm.nickName,
            phone:addForm.phone,
            sex:addForm.sex,
            email:addForm.email 
        }
    })
}


import createAxios from "@/utils/request.js"

const api = {
    login:'/api/login',
    register:'/api/register'
}

export function login(username,password)
{
    return createAxios({
        url:api.login,
        method:'POST',
        data:{
            username:username,
            password:password,
        }
    })
}

export function getRegistor(registerForm){
    return createAxios({
        url:api.register,
        method:'POST',
        data:{
            // registerForm,
            phone:registerForm.phone,
            username:registerForm.username,
            password:registerForm.password,
            nickName:registerForm.nickName,
            phone:registerForm.phone,
            sex:registerForm.sex,
            email:registerForm.email
        }
    })
}
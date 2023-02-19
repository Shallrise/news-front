import createAxios from "@/utils/request.js";

const api = {
  list: "/api/author/articles",
  details: "/api/author/detail",
  edit: "/api/author/article",
  editName:"/api/change_nick",
  editPassword:"/api/change_password"
};

export function getUserNew(token) {
  return createAxios({
    url: api.list,
    method: "get",
    headers: {
      token: token,
    },
  });
}

export function getNewDetails(token, id) {
  return createAxios({
    url: api.details,
    method: "get",
    headers: {
      token: token,
    },
    params: {
      id,
    },
  });
}

export function userEditNews(token, id, news) {
  return createAxios({
    url: api.edit,
    method: "put",
    headers: {
      token: token,
    },
    data: {
      id: id,
      title: news.title,
      introduce: news.introduce,
      picture: news.picture,
      content: news.content,
      tag: news.tag,
      level: news.level,
    },
  });
}

export function deleteNews(token, id) {
  return createAxios({
    url: api.edit,
    method: "delete",
    headers: {
      token: token,
    },
    params:{
        id
    }
  });
}

export function editName(token,username,nickname){
  return createAxios({
    url:api.editName,
    method:'put',
    headers: {
      'token': token,
    },
    data:{
      username,
      nickname
    }
  })
}

export function changePass(token,username,password){
  return createAxios({
    url:api.editPassword,
    method:'put',
    headers:{
      'token':token
    },
    data:{
      token,
      username,
      password
    }
  })
}

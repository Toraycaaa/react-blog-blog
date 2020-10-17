let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList: ipUrl + 'getArticleList',  //home api
    getArticleById: ipUrl + 'getArticleById',   //detailed api
    getTypeInfo: ipUrl + 'getTypeInfo', //文章类别接口
    getListById: ipUrl + 'getListById',   //根据文章id来获取文章列表
    
}

export default servicePath

// 也可以用axios的baseurl封装
// export const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.motivationalmodelling.com';
// const mmApi = axios.create({
//     baseURL: baseUrl
// });


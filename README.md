# “豆瓣酱” 书影音社区
## 一. 页面
- 榜单
- 推荐
- 我的
- 详情
- 记录
- 评论
## 二. API设计

榜单

> GET  /rank  榜单页面所有数据
>
> GET  /movies/new  正在上映的电影
>
> GET  /movies/hot  热门电影
>
> GET  /books/hot  热门书籍
>
> GET  /songs/hot  热门单曲
>
> GET  /search/?wd=&type=&offset=&limit=  搜索

推荐

> GET  /recommend?session_id=  推荐
>
> ```js
> //返回内容
> {
>     movies:[],
>     songs:[],
>     books:[]
> }
> ```

用户

> POST  /login  登陆
>
> ```js
> //发送表单
> {
>     code:""
> }
> //返回内容
> {
>     session_id:""
> }
> ```

详情

> GET  /movies/:id  获取一个电影的详情
>
> ```js
> //返回内容
> {
>     name:"",
>     ...
>     comments:[]
> }
> ```
>
> GET  /songs/:id
>
> GET  /books/:id
>
> POST  /want  标记为想看
>
> ```js
> //发送表单
> {
>     type:"",//movie OR song OR book
>     id:"",
>     session_id:""
> }
> ```
>
> GET  /movies/:id/comments?offset=&limit=  获得某部电影的评论
>
> GET  /songs/:id/comments?offset=&limit=
>
> GET  /books/:id/comments?offset=&limit=

评论

> POST  /comment  评论 书/影/音
>
> ```js
> //发送表单
> {
>     type:"",//movie OR song OR book
>     id:"",
>     session_id:""
> }
> ```

想看

> GET  /movies/want?session_id=&offset=&limit=  获得想看的电影
>
> GET  /songs/want?session_id=&offset=&limit=
>
> GET  /books/want?session_id=&offset=&limit=
>
> GET  /movies/seen?session_id=&offset=&limit=  获得看过的电影
>
> GET  /songs/listened?session_id=&offset=&limit=
>
> GET  /books/viewed?session_id=&&offset=&limit=


## 三. 数据库设计
[数据库设计](https://github.com/nansanhao/DouBanJiang/blob/master/数据库设计.pdf)
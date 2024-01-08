import datetime

from flask import jsonify, request
from . import home

commentList: list = [
    {
        "id": 1,
        "owner": False,
        "hasLike": False,
        "likeNum": 2,
        "avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797755537/0",
        "nickName": "超长昵称超长...",
        "content": "啦啦啦啦",
        "parentId": None,
        "createTime": "2021-07-02 16:32:07"
    },
    {
        "id": 2,
        "owner": False,
        "hasLike": False,
        "likeNum": 2,
        "avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797761970/0",
        "nickName": "寂寞无敌",
        "content": "我是评论的评论",
        "parentId": 1,
        "createTime": "2021-07-02 17:05:50"
    },
    {
        "id": 4,
        "owner": True,
        "hasLike": True,
        "likeNum": 1,
        "avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797763270/0",
        "nickName": "name111",
        "content": "评论啦啦啦啦啦啦啦啦啦啦",
        "parentId": None,
        "createTime": "2021-07-13 09:37:50"
    },
    {
        "id": 5,
        "owner": False,
        "hasLike": False,
        "likeNum": 0,
        "avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797755537/0",
        "nickName": "超长昵称超长...",
        "content": "超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论",
        "parentId": None,
        "createTime": "2021-07-13 16:04:35"
    },
    {
        "id": 13,
        "owner": False,
        "hasLike": False,
        "likeNum": 0,
        "avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797755537/0",
        "nickName": "超长昵称超长...",
        "content": "@寂寞无敌 你怕不是个大聪明",
        "parentId": 1,
        "createTime": "2021-07-14 11:01:23"
    }
]


@home.get("/api/comment/list")
def api_comment_list():
    return jsonify({
        "data": commentList
    })


@home.post("/api/like")
def api_like_action():
    data = request.json
    id = data.get("id")
    comment = list(filter(lambda x: x['id'] == id, commentList))
    print(comment)
    if comment:
        comment = comment[0]
        if comment["hasLike"] is False:
            comment["likeNum"] = comment['likeNum'] + 1
            comment["hasLike"] = True
        else:
            comment["likeNum"] = comment['likeNum'] - 1
            comment["hasLike"] = False

    return {
        'message': "OK"
    }


@home.post('/api/comment/del')
def api_del_comment():
    global commentList
    comment_id = request.json.get("commentId")
    commentList = list(filter(lambda comment: comment['id'] != comment_id, commentList))
    return {
        "message": "OK"
    }


@home.post("/api/comment")
def api_add_comment():
    data = request.json
    print(data)
    commentList.append({
        "id": datetime.datetime.now().strftime("%Y%m%d%H%M%S"),
        "owner": True,
        "hasLike": False,
        "likeNum": 0,
        "avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797763270/0",
        "nickName": "name111",
        "content": data['content'],
        "parentId": data['pId'],
        "createTime": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })
    return jsonify({
        "message": "OK"
    })


@home.route("/api/user")
def api_user():
    print(request.args)

    return jsonify({
        "data": {
            "id": 12,
            "username": "zero"
        },
        "code": 200,
        "message": "OK",
        "success": True
    })

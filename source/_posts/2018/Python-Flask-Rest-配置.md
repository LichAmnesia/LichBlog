---
title: Python Flask Rest 配置
date: 2018-05-03 19:23:19
tags:
    - Python
toc: true
---

本文主要写配置`Flask Restful API`过程。

<!-- more -->

# 1. 安装依赖
安装相关
```
pip3 install flask flask-restful flask-jwt-extended passlib flask-sqlalchemy
```

# 2. 添加 API route
## 2.1 基础 API
```python
from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
```
直接运行`python3 api.py`就可以跑这个程序。

## 2.2 增加 validate 验证请求参数
一般要加`payload`也就是`data`域进行发送请求。这里就需要用到本身`flask_restful`自带的`parse`方法进行`validate`请求数据。更多内容可以参考[文档](https://flask-restful.readthedocs.io/en/latest/reqparse.html).
```python
from flask_restful import reqparse

parser = reqparse.RequestParser()
parser.add_argument('task')

# TodoList
# shows a list of all todos, and lets you POST to add new tasks
class TodoList(Resource):
    def get(self):
        return TODOS

    def post(self):
        args = parser.parse_args()
        todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id
        TODOS[todo_id] = {'task': args['task']}
        return TODOS[todo_id], 201

```

## 2.3 对返回结果进行配置
使用 `fields` 进行对返回结果渲染，可以使用任意想返回的结果（ORM models, custom classes）。更多可以参考文档(https://flask-restful.readthedocs.io/en/latest/fields.html)。
```python
from flask_restful import Resource, fields, marshal_with

resource_fields = {
    'name': fields.String,
    'address': fields.String,
    'date_updated': fields.DateTime(dt_format='rfc822'),
}

class Todo(Resource):
    @marshal_with(resource_fields, envelope='resource')
    def get(self, **kwargs):
        return db_get_todo()  # Some function that queries the db
```

# 3. 连接数据库以及配置 Model
[Example Code](https://github.com/oleg-agapov/flask-jwt-auth/blob/master/step_3/models.py)

[Full docs](https://codeburst.io/jwt-authorization-in-flask-c63c1acf4eeb)

使用 `SQLAlchemy` 的 `db` 以及相关方法映射 `Mysql` 或者 `Sqlite` 数据库。
```python
class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(120), nullable = False)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
```
然后在相应的 `Resourses` 文件下就可以直接返回相应映射的 `Model`
```python
class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()
        new_user = UserModel(
            username = data['username'],
            password = data['password']
        )
        try:
            new_user.save_to_db()
            return {
                'message': 'User {} was created'.format( data['username'])
            }
        except:
            return {'message': 'Something went wrong'}, 500
```
# 4. 增加登录以及 Token 验证
使用 `flask_jwt_extended` 包，然后在登录的时候包会生成相应的`access_token`，这里要注意的是，这个会在`restful`返回结果的`JSON`里面，需要前端存储这个`access_token`然后再在发回请求的`header`里面加入`Authorization: Bearer <access_token>`。

以下是官网的教程例子：
```python
from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)


# Provide a method to create access tokens. The create_access_token()
# function is used to actually generate the token, and you can return
# it to the caller however you choose.
@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    if username != 'test' or password != 'test':
        return jsonify({"msg": "Bad username or password"}), 401

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200


# Protect a view with jwt_required, which requires a valid access token
# in the request to access.
@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


# Endpoint for revoking the current users access token
@app.route('/logout', methods=['DELETE'])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return jsonify({"msg": "Successfully logged out"}), 200
    

if __name__ == '__main__':
    app.run()
```

这里`@jwt_required`意思就是如果`pass`这个函数，就必须要在请求的`header`里加入相关参数`access_token`。

可以在`app.config`里面修改相应配置。比如`Token`的过期时间:
```python
app.config[OPTION_NAME] = new_options
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=2)
```
[官方文档](http://flask-jwt-extended.readthedocs.io/en/latest/index.html)。这里没有使用 `Cookie` 作为验证登录。


# 5. 密码加密
使用`passlib`包对密码进行加密存储。
```python
from passlib.hash import pbkdf2_sha256 as sha256
class UserModel(db.Model):
    ...
    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)
    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)
```

----

因为我们是朋友，所以你可以使用我的文字，但请注明出处：http://alwa.info

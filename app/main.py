import os
from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def hello_world():
    return '欢迎使用微信云托管！'


# WebSocket 处理函数
@socketio.on('message')
def handle_message(message):
    print(f"收到消息: {message}")

    # 处理不同的输入
    if message == 'null':
        emit('message', "有什么能帮到您？")
    elif message:
        emit('message', "文字")
    else:
        emit('message', "多媒体文本")

    print(f"返回消息: {message}")


if __name__ == "__main__":
    # 启动 Flask Web 服务器与 WebSocket 服务器
    socketio.run(app, debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8089)))

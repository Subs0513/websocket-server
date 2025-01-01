const WebSocket = require('ws');

// 创建 WebSocket 服务器并监听 8000 端口
const wss = new WebSocket.Server({ port: 8000 }, () => {
    console.log("WebSocket服务器正在监听8000端口...");
});

// 处理客户端连接
wss.on('connection', (ws) => {
    console.log('客户端已连接');

    // 监听客户端发送的消息
    ws.on('message', (message) => {
        console.log("收到消息", message);
        console.log("消息长度: ", message.length); // 输出消息的长度

        // 将 Buffer 转换为字符串
        const messageString = message.toString();
        console.log("消息的每个字符编码：");
        for (let i = 0; i < messageString.length; i++) {
            console.log(messageString.charCodeAt(i)); // 输出每个字符的编码
        }

        // 去除消息前后的空格和换行符
        const trimmedMessage = messageString.trim();

        if (trimmedMessage === "心跳检测测试消息") {
            // 服务器自动发送回应消息
            if (ws.readyState === WebSocket.OPEN) {
                ws.send("心跳检测成功，欢迎连接服务器");
                console.log("收到来自客户端心跳检测测试消息");
            } else {
                console.log("WebSocket连接已经关闭，无法发送消息");
            }
        }else if (trimmedMessage === "你好") {
            ws.send("你好啊，欢迎使用我的小程序");
            console.log("收到来自客户端非心跳检测消息: %s", messageString);
        } else if (trimmedMessage === "在吗") {
            ws.send("他可能不在，你可以留言，他回来会看");
            console.log("收到来自客户端非心跳检测消息: %s", messageString);
        } else {
            // 将收到的消息发送回客户端
            ws.send(`我收到了你刚发的消息：“${messageString}”，等我看到了会回复的哈`);
            console.log("收到来自客户端非心跳检测消息: %s", messageString);
        }
    });


    // 监听 WebSocket 错误事件
    ws.on('error', (err) => {
        console.log("WebSocket 错误: ", err);
    });

    // 监听 WebSocket 关闭事件
    ws.on('close', () => {
        console.log("客户端连接已关闭");
    });
});

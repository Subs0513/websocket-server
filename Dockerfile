# 使用官方的 Node.js 镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /websocket-server

# 复制 package.json 和 package-lock.json 文件到工作目录
COPY package*.json ./

# 安装应用的依赖
RUN npm install

# 将当前目录下的所有文件复制到容器的工作目录中
COPY . .

# 暴露 WebSocket 服务的端口 8000
EXPOSE 8000

# 启动 WebSocket 服务
CMD ["node", "websocket-server.js"]

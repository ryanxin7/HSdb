# 使用 Node.js 16 作为基础镜像
FROM node:16.18.1

# 设置工作目录
WORKDIR /usr/src/app

# 复制应用程序文件到镜像中
COPY package*.json ./
COPY app.js ./
# 如果有其他必要的文件或目录，也需要复制到镜像中

## 淘宝源
RUN npm config set registry https://registry.npm.taobao.org/

# 安装依赖
RUN npm update

RUN npm install

# 暴露容器端口
EXPOSE 3000

# 运行应用程序
CMD ["node", "app.js"]

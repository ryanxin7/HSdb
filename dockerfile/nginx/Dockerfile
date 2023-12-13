# 使用 Nginx 官方镜像作为基础镜像
FROM nginx:latest


RUN echo "192.168.149.30 hsdb.ryanxin.live" > /etc/hosts

# 将本地的 Nginx 配置文件拷贝到容器中的 /etc/nginx/conf.d/ 目录
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 将本地的 HTML 文件拷贝到容器中的默认 Nginx 静态文件目录
COPY upcard.html /usr/share/nginx/html/upcard.html
COPY index.html /usr/share/nginx/html/index.html

# 声明容器要暴露的端口号
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]

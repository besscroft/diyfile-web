# 该镜像需要依赖的基础镜像
FROM nginx:1.25.1
# 设置环境变量
ENV TZ=Asia/Shanghai
# 设置时区
RUN set -eux; \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; \
    echo $TZ > /etc/timezone
# 拷贝 dist 文件夹所有内容
COPY dist/ /usr/share/nginx/html/
# 拷贝 nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 运行 nginx
CMD ["nginx", "-g", "daemon off;"]
# 指定维护者的名字
MAINTAINER besscroft

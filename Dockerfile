FROM nginx:stable
# 작업 디렉토리 설정
WORKDIR /

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx/conf.d

ADD ./dist ./usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
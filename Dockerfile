FROM nginx:stable as build-stage
# 작업 디렉토리 설정
WORKDIR /app
RUN rm ./app/dist

COPY ./dist ./app/
COPY ./nginx/nginx.conf /etc/nginx/conf/app.conf

COPY --from=build-stage /app /usr/share/nginx/html/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
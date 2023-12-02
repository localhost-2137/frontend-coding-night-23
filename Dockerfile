FROM node:21-bookworm-slim
WORKDIR /app
COPY . /app
RUN npm install

EXPOSE 5173
CMD ["/app/docker-entrypoint.sh"]

FROM node:21-bookworm-slim
WORKDIR /app
COPY . /app
RUN npm install
ENV VITE_API_URL=http://backend:3000
RUN npm run build
CMD ["npm", "run", "preview", "--", "--host"]

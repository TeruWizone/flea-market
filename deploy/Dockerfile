# build : docker buildx build -f deploy/Dockerfile -t flea .

FROM node:20.5-alpine

WORKDIR /src
ENV TZ=Asia/Tokyo
COPY /dist /src/dist
COPY /node_modules /src/node_modules
EXPOSE 3001

CMD ["node", "dist/src/main.js"]
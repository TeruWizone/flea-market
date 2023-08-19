# build : docker buildx build -f deploy/Dockerfile -t flea .
# run   : docker run -p 3001:3001 --name flea flea
# tag   : docker image tag flea:latest 172.25.60.1/nest/flea:latest
# push  : docker image push 172.25.60.1/nest/flea:latest

FROM node:20.5-alpine AS BASEIMAGE

WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY ./src ./src
COPY ./*.json ./
RUN npm run build

FROM node:20.5-alpine

WORKDIR /src
ENV TZ=Asia/Tokyo
COPY --from=BASEIMAGE /src/dist /src/dist
COPY --from=BASEIMAGE /src/node_modules /src/node_modules
EXPOSE 3001

CMD ["node", "dist/main.js"]
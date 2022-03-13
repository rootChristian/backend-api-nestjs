FROM node:latest

RUN npm install -g @nestjs/cli

WORKDIR /app

#COPY ./src src
COPY package*.json .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn install; \
    else yarn install --only=production; \
    fi
#then yarn install && yarn cache clean --force; \

RUN yarn global add node-pre-gyp
RUN node-pre-gyp rebuild -C ./node_modules/argon2

COPY . ./

#EXPOSE 3333

CMD ["nest", "start"]
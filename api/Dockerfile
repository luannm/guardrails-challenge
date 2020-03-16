FROM node:12.2.0-alpine

ENV PORT=5000

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

EXPOSE 5000
CMD ["yarn", "start"]
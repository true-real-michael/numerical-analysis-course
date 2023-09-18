FROM node:16
LABEL authors="mikhailkiselyov"

WORKDIR /front

COPY . .

RUN npm i

ENTRYPOINT ["npx", "next", "dev"]
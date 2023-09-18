FROM node:16
LABEL authors="mikhailkiselyov"

WORKDIR /front

COPY . .

RUN npm i

EXPOSE 3000

ENTRYPOINT ["npx", "next", "dev"]
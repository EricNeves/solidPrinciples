FROM node:20

WORKDIR /app

ARG env=development

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

COPY . .

EXPOSE 3030

CMD ["bash", "start.sh"]
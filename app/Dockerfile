FROM node:20

WORKDIR /app

ARG env=development

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

COPY . .

EXPOSE 3030

RUN pnpm run build

CMD ["sh", "start.sh"]
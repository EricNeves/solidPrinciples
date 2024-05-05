FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

COPY . .

RUN pnpm install

RUN pnpm run build

EXPOSE 3030

CMD ["pnpm", "start"]
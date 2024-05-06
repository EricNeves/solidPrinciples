FROM node:20

WORKDIR /app

ARG env=development

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

COPY . .

RUN pnpm install

# RUN if [ "$env" = "development" ]; then\
#         npx prisma migrate dev; \
#     else \
#         npx prisma migrate deploy; \
#     fi

RUN npx prisma migrate deploy

RUN pnpm run build

EXPOSE 3030

CMD ["pnpm", "start"]
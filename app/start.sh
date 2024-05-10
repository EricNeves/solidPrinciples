#!/bin/bash

pnpm install

pnpm run build

if [ "$env" = "development" ]; then \
    pnpm run migrate:dev; \
    pnpm run dev; \
else \
    pnpm run migrate:prod; \
    pnpm start; \
fi

#!/bin/bash

pnpm install

pnpm run build

if [ "$env" = "development" ]; then \
    pnpm run migrate:dev; \
else \
    pnpm run migrate:prod; \
fi

pnpm start
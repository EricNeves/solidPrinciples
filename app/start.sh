#!/bin/bash

if [ "$env" = "development" ]; then \
    pnpm run migrate:dev; \
else \
    pnpm run migrate:prod; \
fi

pnpm install

pnpm run build

pnpm start
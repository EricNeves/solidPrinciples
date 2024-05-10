#!/bin/bash

pnpm install

pnpm run build

pnpm run migrate:prod

pnpm start

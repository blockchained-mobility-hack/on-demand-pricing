#!/usr/bin/env bash

solium  -d ../contracts \
        --config ../.soliumrc.json \
        --fix

git diff

git add -A
git commit -m "Solidium changes"

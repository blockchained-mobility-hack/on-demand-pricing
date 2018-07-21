#!/bin/bash
#set -xv

docker run --name bid_on_chain_ganache \
           -it \
           --rm \
           -p 8545:8545 \
           trufflesuite/ganache-cli:latest

#!/bin/bash
#set -xv

docker network rm $(docker network ls -q) || true

#!/usr/bin/env bash
#set -xv

containers=$(docker ps -qa)
if [ ! -z "$containers" ]; then
    docker stop $(docker ps -qa)
    echo All containers were stoped.
    docker rm $(docker ps -qa)
    echo All containers where purged.
else
    echo No running containers found.
fi

#!/bin/bash

PORT=3000
if [ -n "$1" ]
then
    PORT=$1
fi

ngrok http --domain=square-notable-shark.ngrok-free.app $PORT
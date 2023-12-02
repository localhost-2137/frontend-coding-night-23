#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR

sudo docker build -t filipton/smarty-frontend:latest .
sudo docker push filipton/smarty-frontend:latest

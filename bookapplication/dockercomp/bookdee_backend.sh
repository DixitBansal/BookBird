#!/bin/bash
apt update
apt install git -y
git clone https://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@github.com/ProBro01/bookapplication.git
cd bookapplication
git config --global user.email "aarryyyadav@gmail.com"
git config --global user.name "aryan"
git checkout -b services
git pull origin services
npm i
npm install pm2 -g
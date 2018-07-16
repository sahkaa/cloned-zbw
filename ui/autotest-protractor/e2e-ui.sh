#!/bin/bash -x

#this script is needed as image we're using (circle/node:9.11.1-stretch-browsers)doesn't have latest google
# chrome drive as protractor requires.
# if you don't use e2e ui tests - feel free to drop it or try to check latest image
curl -L -o google-chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome.deb
sudo sed -i 's|HERE/chrome\"|HERE/chrome\" --disable-setuid-sandbox|g' /opt/google/chrome/google-chrome
rm google-chrome.deb

sudo npm install -g protractor
npm install
npm run postinstall
npm run e2e --baseUrl=${AUREA_API_UI_URL}

#!/bin/bash

# variable
BASE_DIR=/var/www
JVA=$BASE_DIR/web-jva
MHS=$BASE_DIR/web-mhs
IWTH=$BASE_DIR/web-iwth
REPO_DIR=YoQuieroAyudar.github.io
REPO_USER=YoQuieroAyudar
REMOTE_REPO=https://github.com/$REPO_USER/$REPO_DIR.git

echo "syncing JVA in "$JVA
cd $JVA
cd $REPO_DIR
git checkout -- . && git pull
cp -r jva-logos/* logos
cp jva-manifest/manifest.json manifest/

echo "syncing MHS in "$MHS
cd $MHS
cd $REPO_DIR
git checkout -- . && git pull
cp -r mhs-logos/* logos
cp mhs-manifest/manifest.json manifest/

echo "syncing IWTH in "$IWTH
cd $IWTH
cd $REPO_DIR
git checkout -- . && git pull
cp -r iwth-logos/* logos
cp iwth-manifest/manifest.json manifest/

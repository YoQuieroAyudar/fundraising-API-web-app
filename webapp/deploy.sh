TARGET_DIRECTORY=../../YoQuieroAyudar.github.io/
HOST="api.microhuchasolidaria.org"
USER="deploy"
echo "Copying files to "$TARGET_DIRECTORY
cp -r dist/* $TARGET_DIRECTORY
echo 'Done copying'
echo 'run sync command in the server'
ssh $USER@HOST << EOF
  bash ~/sync-all-web.sh
EOF
echo "done syncing the server web apps"

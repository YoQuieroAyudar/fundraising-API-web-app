HOST="api.microhuchasolidaria.org"
USER="deploy"
echo 'run sync command in the server'
ssh $USER@$HOST "bash ~/sync-all-web.sh"
echo "done syncing the server web apps"

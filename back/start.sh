PROCESSNAME="teamfilmBackend"

pm2 delete "$PROCESSNAME"
if [ "$?" -eq "0" ]; then
	echo "Deleted previous version in pm2"
fi

pm2 start --name "$PROCESSNAME" --time "yarn start"


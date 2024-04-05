#!/bin/bash

# No-IP DDNS update script
USERNAME="lucas.mgu+no-ip@gmail.com"
PASSWORD="rmApQJ4y*mZf6j"
HOSTNAME="teamfilm.ddns.net"

response=$(curl -s -k "https://dynupdate.no-ip.com/nic/update?hostname=$HOSTNAME" \
    -u "$USERNAME:$PASSWORD" \
    -H "User-Agent: ddns-update-script")

# Print the response
echo "Response from server: $response"

# Check the exit code of curl
curl_exit_code=$?

if [ $curl_exit_code -eq 0 ]; then
    echo "DDNS update successful!"
else
    echo "DDNS update failed with curl exit code: $curl_exit_code"
fi
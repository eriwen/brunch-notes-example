#!/bin/bash
# Based on work by Tiago Rodrigues
# Here: http://trodrigues.net/presentations/buster-ci/#/24
# And here: https://gist.github.com/2630210

# Usage:
# env BUSTER_HOME=/where/you/installed/buster ./buster-server.sh start|stop

function buster_server_pid(){
    echo `ps aux|grep buster-server|grep node|awk '{ print $2 }'`
}

function phantom_server_pid(){
    echo `ps aux|grep phantomjs|grep buster|awk '{ print $2 }'`
}

case "$1" in
    "start")
        ./node_modules/buster/bin/buster-server & # fork to a subshell
        sleep 4 # takes a while for buster server to start
        phantomjs ./node_modules/buster/script/phantom.js "http://localhost:1111/capture" &
        echo "Started Buster.JS server with Phantom.JS client"
        ;;
    "stop")
        kill `buster_server_pid`
        kill `phantom_server_pid`
        echo "Killed Buster.JS server and Phantom.JS client"
        ;;
    *)
        echo "Usage:
$0 start|stop"
        ;;
esac

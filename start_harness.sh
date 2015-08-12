#!/bin/bash

DATACONNECTOR=develop
DATAFORMULA='feature/actor'
WEBUI=develop
DATAPROVIDER=develop
REFRESH=develop

while true; do
    read -p "Do you wish to start HARNESS 2?" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

echo "Lets see what you want to build"


echo "DATACONNECTOR:" 
read -e -i "$DATACONNECTOR" _DATACONNECTOR
#echo $_DATACONNECTOR

echo "DATAFORMULA:" 
read -e -i "$DATAFORMULA" _DATAFORMULA

echo "WEBUI:" 
read -e -i "$WEBUI" _WEBUI

echo "DATAPROVIDER:" 
read -e -i "$DATAPROVIDER" _DATAPROVIDER

echo "REFRESH:" 
read -e -i "$REFRESH" _REFRESH

USER=superdave
PASS=Password1
IP=192.168.1.106
BUILDTYPEID=Test_BuildStuff

DATA="name=DATACONNECTOR&value=$DATACONNECTOR"
DATA+="&name=DATAFORMULA&value=$DATAFORMULA"
DATA+="&name=WEBUI&value=$WEBUI"
DATA+="&name=DATAPROVIDER&value=$DATAPROVIDER"
DATA+="&name=REFRESH&value=$REFRESH"

WGET="http://$USER:$PASS@$IP:8111/httpAuth/action.html?add2Queue=$BUILDTYPEID&$DATA"
echo "Starting the build through teamcity ..." 
echo $WGET
wget $WGET
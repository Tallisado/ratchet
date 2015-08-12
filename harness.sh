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


echo "DATACONNECTOR    --> $DATACONNECTOR" 
read -e -i "$DATACONNECTOR" _DATACONNECTOR
#echo $_DATACONNECTOR

echo "DATAFORMULA    --> $DATAFORMULA" 
read -e -i "$DATAFORMULA" _DATAFORMULA

echo "WEBUI    --> $WEBUI" 
read -e -i "$WEBUI" _WEBUI

echo "DATAPROVIDER    --> $DATAPROVIDER" 
read -e -i "$DATAPROVIDER" _DATAPROVIDER

echo "REFRESH    --> $REFRESH" 
read -e -i "$REFRESH" _REFRESH

USER=superdave
PASS=Password1
IP=192.168.1.106
BUILDTYPEID=Test_BuildStuff

DATA="name=DATACONNECTOR&value=$DATACONNECTOR"

WGET="http://$USER:$PASS@$IP:8111/httpAuth/action.html?add2Queue=$BUILDTYPEID&$DATA"
echo $WGET
#wget $WGET
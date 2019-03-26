#!/usr/bin/env bash
STRING="Preparing Kenya Build"
echo $STRING;
cp ./src/environments/region.ke.ts ./src/environments/region.ts;
cp ./src/theme/variables.ke.scss ./src/theme/variables.scss;
echo 'Preparation complete'
# note, must ensure file has execute permission in repo
# chmod +x .scripts/prepare.ke.sh

# set production environment
cp ./src/environments/environment.production.ts ./src/environments/environment.ts;

# set kenya resources
echo 'Preparing Kenya Project Resources';
cp ./src/environments/region.ke.ts ./src/environments/region.ts;
cp ./src/theme/variables.ke.scss ./src/theme/variables.scss;
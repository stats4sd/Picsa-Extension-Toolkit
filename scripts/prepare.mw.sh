# set production environment
cp ./src/environments/environment.production.ts ./src/environments/environment.ts;

# set malawi resources
echo 'Preparing Malawi Resources';
cp ./src/environments/region.mw.ts ./src/environments/region.ts;
cp ./src/theme/variables.mw.scss ./src/theme/variables.scss;
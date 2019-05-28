# deploy script for kenya.picsa.app domain (ke version)
firebase use production

# set production environment
cp ./src/environments/environment.production.ts ./src/environments/environment.ts;

# set kenya resources
echo 'Preparing Kenya Project Deploy';
cp ./src/environments/region.ke.ts ./src/environments/region.ts;
cp ./src/theme/variables.ke.scss ./src/theme/variables.scss;

# add malawi project host
# firebase target:apply hosting picsa-kenya picsa-kenya

# deploy
firebase deploy --only hosting:picsa-kenya
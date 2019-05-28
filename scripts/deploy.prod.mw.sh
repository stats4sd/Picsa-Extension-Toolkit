# standard deploy script for picsa.app domain (mw version)
firebase use production

# set production environment
cp ./src/environments/environment.production.ts ./src/environments/environment.ts;

# set malawi resources
echo 'Preparing Malawi Project Deploy';
cp ./src/environments/region.mw.ts ./src/environments/region.ts;
cp ./src/theme/variables.mw.scss ./src/theme/variables.scss;

# add malawi project host
# firebase target:apply hosting picsa-malawi picsa-malawi

# deploy
firebase deploy --only hosting:picsa-malawi
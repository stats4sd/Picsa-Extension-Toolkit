# standard deploy script for picsa.app domain (mw version)
firebase use production

# set malawi resources
echo 'Preparing Malawi Project Deploy';
cp ./src/environments/region.mw.ts ./src/environments/region.ts;
cp ./src/theme/variables.mw.scss ./src/theme/variables.scss;

# set malawi project host
firebase target:apply hosting mw picsa-malawi

# deploy
firebase deploy
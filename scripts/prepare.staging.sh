# note, must ensure file has execute permission in repo
# chmod +x .scripts/prepare.staging.sh

# set staging environment
cp ./src/environments/environment.staging.ts ./src/environments/environment.ts;

# set malawi resources
echo 'Preparing Staging Resources';
cp ./src/environments/region.staging.ts ./src/environments/region.ts;
cp ./src/theme/variables.staging.scss ./src/theme/variables.scss;
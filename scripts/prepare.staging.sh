# set staging resources
echo 'Preparing Staging Resources';
cp ./src/environments/region.staging.ts ./src/environments/region.ts;
cp ./src/theme/variables.staging.scss ./src/theme/variables.scss;
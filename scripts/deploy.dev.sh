# standard deploy script for next.picsa.app domain (mw version)
firebase use staging
# firebase variables are set using command line on a project-wide basis. Can be viewed with code below
# echo "firebase conf: $(firebase functions:config:get)"
# deploy site, functions, rules etc.

# set staging resources
echo 'Preparing Staging Deploy';
cp ./src/environments/region.staging.ts ./src/environments/region.ts;
cp ./src/theme/variables.staging.scss ./src/theme/variables.scss;

# add staging project host
# firebase target:apply hosting picsa-staging picsa-staging

firebase deploy --only hosting:picsa-staging